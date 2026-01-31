"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link"

const jobGroups = [
  {
    name: "Quantitative Investment Strategies",
    jobs: [
      {
        title: "Quantitative Strategist",
        fullTimeDescription:
          "We're seeking a detail-oriented Quantitative Strategist to join our QIS team and contribute to our trading strategies.",
        internshipDescription:
          "Intern as a Quantitative Strategist and gain hands-on experience in developing trading strategies.",
        fullTimeRequirements: [
          "Proficiency in statistics and using Python for statistical analysis",
          "Strong understanding of portfolio management strategies",
          "Willing to learn in a fast-paced environment and communicate with peers",
        ],
        internshipRequirements: [
          "Basic understanding of Python and statistics",
          "Interested in learning about strategy development",
          "Willing to learn in a fast-paced environment and communicate with peers",
        ],
      },
      {
        title: "Data Scientist",
        fullTimeDescription: "Join our QIS team to develop and develop ML models driving our data-driven investment strategies.",
        internshipDescription:
          "Intern as a Data Scientist and work on creating ML models for our cutting-edge investment strategies.",
        fullTimeRequirements: [
          "Strong programming and ML skills in Python",
          "Proficiency in data analysis and visualization",
          "Willing to learn new concepts and apply your skills",
        ],
        internshipRequirements: [
          "Proficient programming skills in Python",
          "Willing to learn new concepts and apply your skills",
        ],
      },
    ],
  },
  {
    name: "Fundamental Team",
    jobs: [
      {
        title: "Analyst",
        fullTimeDescription:
          "We're looking for an Investment Analyst to join our Fundamental Team and contribute to our investment research while guiding Junior Analysts.",
        internshipDescription:
          "Intern as an Investment Analyst and learn apply your economics and fundamental research skills.",
        fullTimeRequirements: [
          "Strong understanding of macro-economics, financial, and competive analysis",
          "Capable communications skills, willing to work both independently and as a part of a team",
        ],
        internshipRequirements: [
          "Strong understanding of macro-economics, financial, and competive analysis",
          "Capable communications skills, willing to work both independently and as a part of a team",
        ],
      },
      {
        title: "Junior Analyst",
        fullTimeDescription:
          "We're looking for an Junior Investment Analyst to join our Fundamental Team and contribute to our fundamental investment research while working with our Analysts.",
        internshipDescription:
          "Intern as an Junior Investment Analyst and learn the basics of fundamental investment research.",
        fullTimeRequirements: [
          "Strong understanding of macro-economics and basic financial statements",
          "Capable communications skills, willing to work both independently and as a part of a team",
        ],
        internshipRequirements: [
          "Strong understanding of macro-economics and basic financial statements",
          "Capable communications skills, willing to work both independently and as a part of a team",
        ],
      },
    ],
  },
  {
    name: "Technology & Engineering",
    jobs: [
      {
        title: "Software Engineer",
        fullTimeDescription: "Join our Engineering team to develop and maintain our trading and analysis platforms.",
        internshipDescription: "Intern as a Software Engineer and contribute to our cutting-edge trading and analysis platforms.",
        fullTimeRequirements: [
          "Strong programming skills in Python, Java, JS, C++, or any other prominent language",
          "Ability to work with other team members on projects",
          "Capable of self-learning in a fast-paced environment",
        ],
        internshipRequirements: [
          "Proficient programming skills in Python, Java, JS, C++, or any other prominent language",
          "Ability to work with other team members on projects",
          "Capable of self-learning in a fast-paced environment",
        ],
      },
    ],
  },
]

export default function Jobs() {
  const [jobType, setJobType] = useState("full-time")

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Career Opportunities</h1>
      <p className="text-xl">Join our team of students to learn and innovate. Open to high school students.</p>

      <Tabs defaultValue="full-time" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="full-time" onClick={() => setJobType("full-time")}>
            Full-time Roles
          </TabsTrigger>
          <TabsTrigger value="internship" onClick={() => setJobType("internship")}>
            Internships
          </TabsTrigger>
        </TabsList>
        <TabsContent value="full-time">
          <JobList jobGroups={jobGroups} jobType="full-time" />
        </TabsContent>
        <TabsContent value="internship">
          <JobList jobGroups={jobGroups} jobType="internship" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function JobList({ jobGroups, jobType }) {
  return (
    <>
      {jobGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-6">
          <h2 className="text-2xl font-semibold">{group.name}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {group.jobs.map((job, jobIndex) => (
              <Card key={jobIndex} className="bg-gray-800">
                <CardHeader>
                  <CardTitle>
                    {job.title} {jobType === "internship" ? "(Internship)" : ""}
                  </CardTitle>
                  <CardDescription>
                    {jobType === "full-time" ? job.fullTimeDescription : job.internshipDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">Requirements:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {(jobType === "full-time" ? job.fullTimeRequirements : job.internshipRequirements).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link
                      href={`/apply?role=${encodeURIComponent(job.title)}${jobType === "internship" ? " (Internship)" : ""}`}
                    >
                      Apply Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

