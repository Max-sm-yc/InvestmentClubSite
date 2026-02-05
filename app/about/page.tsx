import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const currentTeam = [
  {
    name: "Max Sun",
    title: "Investment Club President, CEO | Birdfeeder, Founder & Head of QIS",
    bio: "Max was the former co-founding CFO at the Birdfeeder. He also led the creation of the SCO Fund and Lexicon projects",
  },
  {
    name: "Sam Parnell-Kerr",
    title: "COO | Birdfeeder",
    bio: "Sam led the Birdfeeder's initial forays into automating key business processes",
  },
  {
    name: "Gertrude Lazarus",
    title: "CFO | Birdfeeder, Investment Club Analyst",
    bio: "",
  },
  {
    name: "Owen Crellin",
    title: "CMO | Birdfeeder",
    bio: "",
  },
  {
    name: "Josie Hyden",
    title: "Head of Social Media Marketing | Birdfeeder",
    bio: "",
  },
  {
    name: "Ray Chen",
    title: "Co-Founder of QIS, Investment Club Analyst",
    bio: "",
  },
  {
    name: "Aarnav Narayanan",
    title: "Marketing | Birdfeeder",
    bio: "",
  },
  {
    name: "Andrea Sgro Plaut",
    title: "Social Media | Birdfeeder",
    bio: "",
  },
  {
    name: "Automne Beauchamp",
    title: "Operations | Birdfeeder",
    bio: "",
  },
  {
    name: "Benjamin Abes-Feldman",
    title: "Social Media | Birdfeeder",
    bio: "",
  },
  {
    name: "Dakota Moesker",
    title: "Business Analyst | Birdfeeder",
    bio: "",
  },
  {
    name: "Dima Chernovol",
    title: "Operations | Birdfeeder",
    bio: "",
  },
  {
    name: "Eric Niu",
    title: "Data Scientist | Birdfeeder",
    bio: "",
  },
  {
    name: "Hayden Reaves",
    title: "Marketing | Birdfeeder",
    bio: "",
  },
  {
    name: "Jack Fontenot",
    title: "Operations | Birdfeeder",
    bio: "",
  },
  {
    name: "Kevin Li",
    title: "Business Analyst | Birdfeeder",
    bio: "",
  },
  {
    name: "Leah Schwartz",
    title: "Operations | Birdfeeder, Investment Club Analyst",
    bio: "",
  },
  {
    name: "Naina Menon",
    title: "Operations | Birdfeeder",
    bio: "",
  },
  {
    name: "Sasha Slepnev",
    title: "Data Engineer | Birdfeeder",
    bio: "",
  },
    {
    name: "Weichu Wang",
    title: "Operations | Birdfeeder",
    bio: "",
  },
  {
    name: "William Zhu",
    title: "Business Analyst | Birdfeeder",
    bio: "",
  },
]

const alumni = [
  {
    name: "Nicholas Vredeveld",
    title: "Former CEO | Birdfeeder, Investment Club President",
    classOf: "2025",
    bio: "",
  },
  {
    name: "Ethan Argus",
    title: "Former COO | Birdfeeder",
    classOf: "2025",
    bio: "",
  },
]

export default function About() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">About CCDS Investment Club</h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          CCDS Investment Club was founded in 2019. Since then, we have grown rapidly, expanding our club to include the Birdfeeder and a Quantitative Investment Strategies Group. We are proud of our philanthropic work at Cincinnati Country Day School.
        </p>
      </section>

      {/* Current Team Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">Current Personnel</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentTeam.map((member, index) => (
            <Card key={index} className="bg-gray-800 border-none">
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="text-blue-400 font-medium">
                  {member.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Alumni Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-400">Club Alumni</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alumni.map((member, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 relative overflow-hidden">
              {/* Class Year Badge */}
              <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 px-3 py-1 text-xs font-bold rounded-bl-lg">
                Class of {member.classOf}
              </div>
              
              <CardHeader>
                <CardTitle className="text-gray-200 text-lg">{member.name}</CardTitle>
                <CardDescription className="text-gray-500">
                  {member.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
