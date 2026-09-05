

const Hero = () => {
  return (
   <section
      id="home"
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
    >
      <div className="hero-actions">
        <p>Welcome to CampusHub</p>

        <h1 id="hero-heading">
          Everything you need to manage campus life in one place.
        </h1>

        <p id="hero-description">
          Built by students, for students.
        </p>

        <div>
          <a href="#signup">Get Started</a>
          <a href="#about">Learn More</a>
        </div>
      </div>

      <figure>
        <img
          src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='1200' height='800' rx='24' fill='%23e5e7eb'/%3E%3Crect x='72' y='72' width='1056' height='656' rx='20' fill='%23f9fafb' stroke='%23cbd5e1' stroke-width='4'/%3E%3Crect x='120' y='128' width='360' height='44' rx='12' fill='%239ca3af'/%3E%3Crect x='120' y='204' width='280' height='24' rx='10' fill='%23d1d5db'/%3E%3Crect x='120' y='248' width='320' height='24' rx='10' fill='%23d1d5db'/%3E%3Crect x='120' y='320' width='420' height='220' rx='18' fill='%23bfdbfe'/%3E%3Crect x='580' y='320' width='320' height='120' rx='18' fill='%23ddd6fe'/%3E%3Crect x='580' y='468' width='320' height='72' rx='18' fill='%23fde68a'/%3E%3Ctext x='50%25' y='86%25' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='34'%3EDashboard%20Preview%3C/text%3E%3C/svg%3E"
          alt="Dashboard preview placeholder"
          width="1200"
          height="800"
        />

        <figcaption>Dashboard preview placeholder</figcaption>
      </figure>
    </section>
  )
}

export default Hero
