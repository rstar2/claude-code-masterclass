// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <p className="my-4 text-body">Tiny missions. Big office mischief.</p>
        <p className="text-body">
          Plan and execute tiny acts of workplace rebellion. Steal the office snacks.
          Liberate the good chair. Borrow all the pens. Your mission, should you choose
          to accept it: make the workday a little more interesting.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="/login" className="rounded bg-primary px-4 py-2 text-dark hover:opacity-90">
            Log In
          </a>
          <a href="/signup" className="rounded border border-primary px-4 py-2 text-primary hover:bg-primary/10">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}
