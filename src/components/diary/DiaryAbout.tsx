import React from 'react';
import { Link } from 'react-router-dom';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>My Diary</h1>
            <h3>Welcome to My Thoughts</h3>
            <br />
            <div className="text-block">
                <p>
                Hey, it's Lopa. Just a high school student navigating life one step at a time.
                <br />
                Graduation is coming up in 2026, and I'm still figuring things out, but one thing's for sure technology has always been my thing.
                <br/>
                </p>
                <p>
                If you're wondering about my nickname, "Lopa" comes from the middle four letters of my name. Simple, right?
                </p>
                <br />
                <p>
                    This space is just a little glimpse into my world. If you ever want to reach out, you can find me through{' '}
                    the contact form in the showcase or email me at{' '}
                    <a href="mailto:lopa@programmer.net">
                    lopa@programmer.net
                    </a>
                </p>
            </div>
            
               
        </div>
    );
};

export default About;
