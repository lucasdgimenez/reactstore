import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';

const HomepageLayout = props => {
  return (
    <div className="fullHeight">
      <Header {...props}/>
       {props.children}
      <Footer/>
    </div>
  );
};

export default HomepageLayout;