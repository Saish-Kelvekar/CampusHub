import React from 'react'

const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading">
          <figure>
            <img
              src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'%3E%3Crect width='1200' height='900' rx='32' fill='%23e2e8f0'/%3E%3Crect x='90' y='90' width='1020' height='720' rx='26' fill='%23f8fafc' stroke='%23cbd5e1' stroke-width='4'/%3E%3Ccircle cx='260' cy='250' r='84' fill='%23bae6fd'/%3E%3Crect x='390' y='190' width='520' height='44' rx='14' fill='%2394a3b8'/%3E%3Crect x='390' y='260' width='420' height='24' rx='10' fill='%23cbd5e1'/%3E%3Crect x='190' y='390' width='820' height='130' rx='20' fill='%23dbeafe'/%3E%3Crect x='190' y='550' width='360' height='170' rx='20' fill='%23dcfce7'/%3E%3Crect x='590' y='550' width='420' height='170' rx='20' fill='%23fee2e2'/%3E%3Ctext x='50%25' y='88%25' text-anchor='middle' fill='%2364748b' font-family='Arial, sans-serif' font-size='34'%3EAbout%20Illustration%20Placeholder%3C/text%3E%3C/svg%3E"
              alt="Illustration placeholder showing a CampusHub information panel"
              width="1200"
              height="900"
            />

            <figcaption>Illustration placeholder</figcaption>
          </figure>

          <article>
            <h2 id="about-heading">About CampusHub</h2>

            <p>
              CampusHub was created after experiencing the everyday challenges
              of college life. Instead of juggling notebooks, WhatsApp groups,
              calendars, and spreadsheets, students can manage everything from
              one platform. Every feature is built around real academic needs
              to help students stay organized and productive.
            </p>

            <ul>
              <li>
                <strong>Less stress:</strong> Never worry about forgotten
                assignments or missed classes again.
              </li>

              <li>
                <strong>Stay organized:</strong> Keep all your academic
                information structured and easy to access.
              </li>

              <li>
                <strong>Built with students in mind:</strong> Every feature is
                created around real college life, not assumptions.
              </li>
            </ul>

            <p>
              <a href="#signup">Explore CampusHub</a>
            </p>
          </article>
        </section>
  )
}

export default About
