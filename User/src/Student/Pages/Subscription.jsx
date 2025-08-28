import React from 'react'

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    blurb: "Great for trying things out",
    features: ["Access to selected courses", "Community forum", "Email support"],
    prices: { monthly: 9, yearly: 90 }, // yearly = discounted total per year
    badge: null,
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "Everything you need to learn fast",
    features: [
      "All current courses",
      "Quizzes & assignments",
      "Certificate on completion",
      "Priority support",
    ],
    prices: { monthly: 19, yearly: 190 },
    badge: "Popular",
  },
  {
    id: "team",
    name: "Team",
    blurb: "For small teams & classrooms",
    features: ["Everything in Pro", "5 seats included", "Admin dashboard", "Team analytics"],
    prices: { monthly: 49, yearly: 490 },
    badge: "Best value",
  },
];

const Subscription = () => {
  return (
    <div>Subscription</div>
  )
}

export default Subscription