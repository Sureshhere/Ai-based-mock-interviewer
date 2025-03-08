"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { use } from "react"; // ✅ Import `use` to unwrap params
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const { interviewId } = use(params); // ✅ Unwrap params
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (!interviewId) return; 
    GetInterviewDetails();
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
  
    if (result.length > 0) {
      let jsonMockResp = result[0].jsonMockResp;
  
      console.log("Raw jsonMockResp from DB:", jsonMockResp); // ✅ Log for debugging
  
      try {
        jsonMockResp = JSON.parse(jsonMockResp);  // First Parse
  
        console.log("Parsed once:", jsonMockResp); // ✅ Log after first parse
  
        if (typeof jsonMockResp === "string") {
          jsonMockResp = JSON.parse(jsonMockResp);  // Second Parse (if needed)
          console.log("Parsed twice:", jsonMockResp); // ✅ Log after second parse
        }
      } catch (error) {
        console.error("❌ Invalid JSON Format:", error, "\nProblematic Data:", jsonMockResp);
        return;
      }
  
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    }
  };
  

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        {/* Question Section */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
