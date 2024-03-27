const benefits = [
  {
    title: "One low price",
    subtitle: "Save ig. get everything with a super low monthly subscription.",
  },
  {
    title: "No limits",
    subtitle: "Get complete access to everything on the site.",
  },
  {
    title: "Cancel anytime",
    subtitle: "Pause or stop your subscription",
  },
]
export default function Benefits() {
  return (
    <div className="bg-black">
      <div className="column-padding">
        <div className="content-grid x1">
          {benefits.map(benefit => (
            <div key={benefit.title} className="spacing-base">
              <h3>
                {benefit.title}
                <br/>
              </h3>
              <div>{benefit.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
