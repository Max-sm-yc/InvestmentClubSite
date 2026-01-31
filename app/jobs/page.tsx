import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const jobGroups = [
  {
    name: "Quantitative Investment Strategies",
    jobs: [
      {
        title: "Quantitative Strategist",
        description:
          "We're seeking a detail-oriented Quantitative Strategist to join our QIS team and contribute to our trading strategies.",
        requirements: [
          "Proficiency in statistics and using Python for statistical analysis",
          "Strong understanding of portfolio management strategies",
          "Willing to learn in a fast-paced environment and communicate with peers",
        ],
      },
      {
        title: "Data Scientist",
        description: "Join our QIS team to develop and develop ML models driving our data-driven investment strategies.",
        requirements: [
          "Strong programming and ML skills in Python",
          "Proficiency in data analysis and visualization",
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
        description:
          "We're looking for an Investment Analyst to join our Fundamental Team and contribute to our investment research while guiding Junior Analysts.",
        requirements: [
          "Strong understanding of macro-economics, financial, and competitive analysis",
          "Capable communications skills, willing to work both independently and as a part of a team",
        ],
      },
      {
        title: "Junior Analyst",
        description:
          "We're looking for an Junior Investment Analyst to join our Fundamental Team and contribute to our fundamental investment research while working with our Analysts.",
        requirements: [
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
        description: "Join our Engineering team to develop and maintain our trading and analysis platforms.",
        requirements: [
          "Strong programming skills in Python, Java, JS, C++, or any other prominent language",
          "Ability to work with other team members on projects",
          "Capable of self-learning in a fast-paced environment",
        ],
      },
    ],
  },
]

export default function Jobs() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Club Roles</h1>
        <p className="text-xl text-gray-400">
          Our team is composed of dedicated students focused on learning and innovation in the financial world.
        </p>
      </div>

      <div className="space-y-16">
        {jobGroups.map((group, groupIndex) => (
          <section key={groupIndex} className="space-y-6">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">{group.name}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {group.jobs.map((job, jobIndex) => (
                <Card key={jobIndex} className="bg-gray-800 border-none">
                  <CardHeader>
                    <CardTitle className="text-white">{job.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {job.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider text-gray-400">
                      Requirements:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
