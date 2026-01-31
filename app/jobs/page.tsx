import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const jobGroups = [
  {
    name: "Quantitative Investment Strategies",
    jobs: [
      {
        title: "Quantitative Strategist",
        description:
          "Quantitative Strategists are the core of the QIS team and are responsible for ideation, development and creation of our trading strategies.",
        requirements: [
          "Proficiency in statistics and using Python for statistical analysis",
          "Strong understanding of portfolio management strategies",
          "Willing to learn in a fast-paced environment and communicate with peers",
        ],
      },
      {
        title: "Data Scientist",
        description: "Data Scientists work on finding trends in data and creating actionable models that enable Strategists to create strategies.",
        requirements: [
          "Strong programming and ML skills in Python",
          "Proficiency in data analysis and visualization",
          "Willing to learn new concepts and apply your skills",
        ],
      },
    ],
  },
  {
    name: "Investment Club",
    jobs: [
      {
        title: "Junior Analyst",
        description:
          "Junior Analysts work with Analysts in analysis and recommendations while preparing to analyze on their own.",
        requirements: [
          "Strong willingness to learn and interest in financial markets, business, and economics",
          "Capable communications skills, willing to work both independently and as a part of a team",
        ],
      },
      {
        title: "Analyst",
        description:
          "Analysts have capable understandings of fundamental analysis and directly contribute to investment analysis and recommendation.",
        requirements: [
          "Strong understanding of macro-economics, financial, and competitive analysis",
          "Capable communications skills, willing to work both independently and as a part of a team",
        ],
      },
      {
        title: "Portfolio Manager",
        description:
          "Portfolio managers lead and educate teams of analysts and manage a portion of our overall portfolio, taking ownership of their results.",
        requirements: [
          "Ability to both conduct fundamental analysis within economic backdrops as well as spot thematic trends",
          "Strong leadership skills, capable of guiding analysts and creating a welcoming team environment",
        ],
      },
    ],
  },
  {
    name: "Birdfeeder",
    jobs: [
      {
        title: "Software Developer",
        description: "Developers work at the Birdfeeder to create platforms that allow operations and financial personnel to understand data.",
        requirements: [
          "Programming skills in any prominent computing language",
          "Ability to work with other team members on projects",
          "Capable of self-learning in a fast-paced environment",
        ],
      },
      {
        title: "Data Scientist",
        description: "Data scientists work on the Birdfeeder's predictive analytics capabilities to improve our supply-chain management.",
        requirements: [
          "Programming skills in any prominent computing language",
          "Understanding of statistics and use of statistical models",
          "Driven, independent, and willing to work with peers",
        ],
      },
      {
        title: "Data Engineer",
        description: "Data professionals work on data pipelines and warehousing to enable the storage and analysis of KPIs.",
        requirements: [
          "Programming skills in any prominent computing language",
          "Strong communication abilities to understand needs of team members",
        ],
      },
      {
        title: "Business Analyst",
        description: "Business Analysts work under our Financials Team to interpret financials and operations data to uncover actionable insights.",
        requirements: [
          "Understanding of accounting and financial statements",
          "Ability to translate business insights and communicate them to other teams",
          "Strong problem solving skills to determine cause and effects",
        ],
      },
      {
        title: "Social Media Creator",
        description: "Members of our Social Media team working under Marketing drive customer engagement in our business and products.",
        requirements: [
          "Capable of designing visuals for social media content",
          "Understanding of what drives engagement for our customer base",
        ],
      },
    ],
  },
]

export default function Jobs() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Roles</h1>
        <p className="text-xl text-gray-400">
          Our team is composed of dedicated students focused on learning and innovating in a variety of fields. Here is a selection of roles that students at CCDS can enter upon joining one of our organizations. 
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
                      Skills:
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
