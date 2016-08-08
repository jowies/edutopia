import React from 'react';

const AboutUs = () => (
  <div className="mdl-grid" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} >
    <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" >
    </div>
    <div
      className="mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingLeft: '10px',
        paddingRight: '10px' }}
    >
      <div className="demo-crumbs mdl-color-text--grey-500">
      </div>
      <h3>What is Edutopia?</h3>
      <p>
        Edutopia is a platform which allows students
        to ask anonymous questions to the lecturer and
        upvote each others questions during a lecture.
        The purpose of Edutopia is to enable all students
        to interact with their lecturer and thus enable the
        lecturer to give the best possible lectures.
      </p>
      <p>
      </p>
        It is said that the fear of speaking in
        public is to many people greater than the fear
        of death. This comes to show in large lectures, as many students
        are afraid of interacting with their lecturer.
      <p>
        By asking questions, students let their lecturer know
        which parts of the curriculum they find difficult
        and misunderstandings are clarified. Questions give
        students a chance to keep up with the lecturer and
        allow them to get the most out of the lecture. The
        information provided by the students makes it easier
        for the lecturer to connect with the students and improve
          the quality of their education.
      </p>
      <h3>How does it work?</h3>
      <p>
        It is a lecturer’s choice to use Edutopia.
        The lecturer creates a “room” and gives his or
        her students access. During the lecture students
        can ask questions, read each others questions and
        vote on the questions they want the lecturer to spend
        time on. The lecturer receives the information provided
        by the students instantaneously and is notified when a
        specific question has received numerous votes. The lecturer
        is free to chose to answer questions continuously, at agreed
        upon times or after the lecturer.
      </p>
      <h4>
        Our hope is that when using Edutopia, students with questions
        realise that they are not the only one and therefore give them
        the confidence to ask questions in all assemblies they are a part
        of in the future.
      </h4>
      <h4>
        Edutopia does not require any preliminary work
        before lectures and is very simple to use. Edutopia
        encourages students to be active in the lecture and
        reveals how the quality of their education can be improved.
      </h4>
    </div>
  </div>
);

export default AboutUs;
