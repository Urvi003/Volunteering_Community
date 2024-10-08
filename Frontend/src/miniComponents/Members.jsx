import React from "react";


const Members = () => {
  const members = [
    {
      id: 1,
      image: "/m1.jpg",
      title: "Alexa",
    },
    {
      id: 2,
      image: "/m2.jpg",
      title: "Jhon",
    },
    {
      id: 3,
      image: "/m3.jpg",
      title: "Michael",
    },
    {
      id: 4,
      image: "/m4.jpg",
      title: "Rober",
    },
    {
      id: 5,
      image: "/m5.jpg",
      title: "Siri",
    },
    {
      id: 6,
      image: "/m6.jpg",
      title: "Tobey",
    },
    {
      id: 7,
      image: "/m7.jpg",
      title: "Jhon Wick",
    },
  ];
  return (
    <>
      <section className="members" data-aos="fade-up">
        <div className="container">
          <div className="heading_section">
            <h2 className="heading">MEMBERS</h2>
            <p>
            Welcome to our community! Meet our dedicated team of experts, 
            ready to assist you with their skills and passion. Together, 
            we strive for excellence and innovation in everything we do.
            </p>
          </div>
          <div className="members_container">
            {members.map((element) => (
              <div className="card" key={element.id} data-aos="fade-up">
                <img src={element.image} alt={element.title} />
                <h3>{element.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Members;