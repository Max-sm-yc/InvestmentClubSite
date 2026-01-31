import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Nicholas Vredeveld",
    title: "President of Investment Club",
  },
  {
    name: "Max Sun",
    title: "Founder & Head of QIS, Quantitative Strategist at QIS",
  },
  {
    name: "Ray Chen",
    title: "Co-Founder of QIS, Quantitative Strategist at QIS",
  },
  {
    name: "Jack Albers",
    title: "DS / MLE at QIS",
  },
  {
    name: "Sam Parnell-Kerr",
    title: "DS / MLE at QIS",
  },
  {
    name: "Ved Deshmukh",
    title: "DS / MLE at QIS",
  },
]

export default function About() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">About CCDS Investment Club</h1>
      <p className="text-xl">
        CCDS Investment Club was founded in 2019. Since then, we have grown rapidly, expanding our club to include Private Equity holdings and a Quantitative Investment Strategies Group.
      </p>
      <h2 className="text-2xl font-semibold">Our Approach</h2>
      <p>
        At CCDS Investment Club, we combine a wide variety of talents and interests, enabling us to dynamically and creatively manage our portfolio.
      </p>
      <h2 className="text-2xl font-semibold">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <Card key={index} className="bg-gray-800">
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

