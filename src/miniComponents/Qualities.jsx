import React from "react";

const Qualities = () => {
  const qualities = [
    {
      id: 1,
      image: "/community.jpg",
      title: "COMMUNITY DEVELOPMENT",
      description:
        "We strive to build a strong, inclusive volunteer community through collaborative efforts and mutual support. Our programs include team-building events, skills development workshops, and joint volunteer projects. Together, we can make a meaningful difference..",
    },
    {
      id: 2,
      image: "/transparency.jpg",
      title: "TRANSPARENCY",
      description:
        "We are committed to maintaining transparency in all our activities and decisions. By regularly sharing detailed reports and financial statements, we foster trust and accountability within our volunteer community. Honesty and openness are our core values.",
    },
    {
      id: 3,
      image: "/impact.jpg",
      title: "IMPACT MEASUREMENT",
      description:
        "We continuously evaluate the effectiveness of our volunteer initiatives to ensure they create significant positive change. Using data-driven methods, we refine our strategies and maximize our collective impact. Our aim is to achieve sustainable and measurable results.",
    },
  ];
  return (
    <>
      <div className="qualities">
        <h2>OUR QUALITIES</h2>
        <div className="container">
          {qualities.map((elememt) => {
            return (
              <div className="card" key={elememt.id}>
                <div className="img-wrapper">
                  <img src={elememt.image} alt={elememt.title} />
                </div>
                <div className="content">
                  <p className="title">{elememt.title}</p>
                  <p className="description">{elememt.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Qualities;