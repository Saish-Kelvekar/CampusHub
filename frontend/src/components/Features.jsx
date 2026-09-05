import React from 'react'

const Features = () => {
  return (
    <section id="features">
          <header>
            <h2>Features Built for Campus Life</h2>

            <p>
              Everything your campus community needs to stay informed,
              organized, and connected.
            </p>
          </header>

          <ul className="features-grid">
            <li>
              <article>
                <div className="features-icons" aria-hidden="true">
                  📅
                </div>
                <h3>Smart Scheduling</h3>
                <p>
                  Plan classes, events, and deadlines in one calendar with
                  clear daily and weekly views.
                </p>
              </article>
            </li>

            <li>
              <article>
                <div className="features-icons" aria-hidden="true">
                  📢
                </div>
                <h3>Instant Announcements</h3>
                <p>
                  Share urgent updates and campus notices in real time so no
                  important message is missed.
                </p>
              </article>
            </li>

            <li>
              <article>
                <div className="features-icons" aria-hidden="true">
                  📚
                </div>
                <h3>Resource Hub</h3>
                <p>
                  Access study materials, policies, forms, and department
                  files from a single trusted location.
                </p>
              </article>
            </li>

            <li>
              <article>
                <div className="features-icons" aria-hidden="true">
                  💬
                </div>
                <h3>Community Discussions</h3>
                <p>
                  Enable meaningful student and faculty conversations through
                  focused discussion spaces.
                </p>
              </article>
            </li>

            <li>
              <article>
                <div className="features-icons" aria-hidden="true">
                  🔔
                </div>
                <h3>Personalized Alerts</h3>
                <p>
                  Receive reminders for classes, submissions, and events
                  tailored to your role and preferences.
                </p>
              </article>
            </li>

            <li>
              <article>
                <div className="features-icons" aria-hidden="true">
                  📈
                </div>
                <h3>Performance Insights</h3>
                <p>
                  Track engagement and academic progress with
                  easy-to-understand summaries and trends.
                </p>
              </article>
            </li>
          </ul>
        </section>
  )
}

export default Features
