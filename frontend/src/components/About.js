import React, { Component } from "react";
import "../styles/about.css";

const About = () => {
  return (
    <section id="about">
      <div id="content" className="row">
        <div className="three columns">
          <img
            className="profile-pic"
            src="images/profilepic.jpg"
            alt="Pak Fam Pic"
          />
        </div>
        <div className="nine columns main-col">
          <h2>About Us</h2>

          <p>This is a Web Gallery for My family</p>
          <p>Daniel Pak + Jay Chung = Dean JooAn Pak</p>
          <div className="columns contact-details">
            <h2>Contact Details</h2>
            <p className="address">
              <span>Daniel Pak</span>
              <br />
              <span>pic2725@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
