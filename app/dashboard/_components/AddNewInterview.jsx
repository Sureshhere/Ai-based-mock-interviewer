"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `
      Job Position: ${jobPosition || "Not Provided"},
      Job Description: ${jobDesc || "Not Provided"},
      Years of Experience: ${jobExperience || "Not Provided"},
      Generate 5 interview questions and answers. The questions should be technical questions only. No general or behavioral questions. Also don't ask to write code.
      Please respond **only with valid JSON** formatted as follows:
      [
        {
          "Question": "What is polymorphism?",
          "Answer": "Polymorphism is the ability of an object to take on multiple forms..."
        }
      ]
    `;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = await result.response.text();

      const jsonMatch = rawResponse.match(/\[.*\]/s);
      if (!jsonMatch) throw new Error("Invalid AI response format");

      const parsedJson = JSON.parse(jsonMatch[0]); 
      console.log(parsedJson);
      setJsonResponse(parsedJson);

      if (parsedJson) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(parsedJson), 
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("YYYY-MM-DD"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);

        if (resp.length > 0) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${resp[0]?.mockId}`);
        }
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      alert("An error occurred while generating interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about the interview
            </DialogTitle>

            <div className="text-sm text-muted-foreground">
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2 className="text-lg font-semibold">
                    Add details about your job role, description, and experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Role/Position</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="my-5">
                    <label className="text-black">Job Description/Tech Stack</label>
                    <Textarea
                      className="placeholder-opacity-50"
                      placeholder="Ex. React, Angular, Node.js, Python"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>

                  <div className="my-5">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating AI Questions...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
