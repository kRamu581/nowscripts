import asyncHandler from "express-async-handler";
import Course from "../models/course";
import Project from "../models/project";
import InterviewQuestion from "../models/interviewQuestion";

export const searchAll = asyncHandler(async (req, res) => {
  const { q, type } = req.query;

  if (!q || typeof q !== "string") {
    res.status(400).json({ error: "Query parameter 'q' is required" });
    return;
  }

  const query = q.trim();
  const searchFilter = { $text: { $search: query } };
  const sort = { score: { $meta: "textScore" } };
  const projection = { score: { $meta: "textScore" } };
  const limit = 5;

  let courses: any[] = [];
  let projects: any[] = [];
  let interviewQuestions: any[] = [];

  // Search Courses
  if (!type || type === "all" || type === "courses") {
    const results = await Course.find(searchFilter, projection)
      .sort(sort)
      .limit(limit)
      .lean();
      
    courses = results.map((c: any) => ({
      id: c._id,
      type: "course",
      title: c.title,
      snippet: c.description ? (c.description.length > 100 ? c.description.substring(0, 100) + "..." : c.description) : "",
      url: `/learn`, // Ideally, this would route directly to a course if we had slug/category routing logic
    }));
  }

  // Search Projects
  if (!type || type === "all" || type === "projects") {
    const results = await Project.find(searchFilter, projection)
      .sort(sort)
      .limit(limit)
      .lean();
      
    projects = results.map((p: any) => ({
      id: p._id,
      type: "project",
      title: p.title,
      snippet: p.description ? (p.description.length > 100 ? p.description.substring(0, 100) + "..." : p.description) : "",
      url: `/projects/${p._id}`,
    }));
  }

  // Search Interview Questions
  if (!type || type === "all" || type === "interview") {
    const results = await InterviewQuestion.find(searchFilter, projection)
      .sort(sort)
      .limit(limit)
      .lean();
      
    interviewQuestions = results.map((q: any) => ({
      id: q._id,
      type: "interview",
      title: q.question,
      snippet: q.answer ? (q.answer.length > 100 ? q.answer.substring(0, 100) + "..." : q.answer) : "",
      url: `/interview-prep`, // Points to the main prep dashboard
    }));
  }

  res.json({
    courses,
    projects,
    interview: interviewQuestions,
  });
});
