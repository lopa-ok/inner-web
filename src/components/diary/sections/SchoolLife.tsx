import React from 'react';
import { Link } from 'react-router-dom';

const SchoolLife: React.FC = () => {
    return (
        <div className="site-page-content">
            <h1>School Life</h1>
            <h3>My Academic Journey</h3>
            <br />
            <div className="text-block">
                <p>
                    I'm currently an IGCSE student at Alkarma International School. It's been quite a journey, filled with both challenges and achievements.
                </p>
                <br />
                <h3>Subjects that are over</h3>
                <p>
                    - June 2024: English, Mathematics, Computer Science, ICT, and Chemistry (✓)<br />
                    - Novamber 2024 :AS Mathematics (✓)<br />
                    
                    
                </p>
                <br />
                <h3>Whats next ?</h3>
                <p>
                <span style={styles.currentlyTaking as React.CSSProperties}>
                        - Currently taking: A2 Mathematics, Physics
                        <svg style={{
                            position: 'absolute' as 'absolute',
                            top: '35%',
                            left: 0,
                            width: '100%',
                            height: '10px',
                            pointerEvents: 'none'
                        }}>
                            <path
                                d="M0,5 C10,-5 20,15 30,5 C40,-5 50,15 60,5 C70,-5 80,15 90,5 C100,-5 110,15 120,5 C130,-5 140,15 150,5 C160,-5 170,15 180,5 C190,-5 200,15 210,5 C220,-5 230,15 240,5 C250,-5 260,15 270,5 C280,-5 290,15 300,5 C310,-5 320,15 330,5 C340,-5 350,15 360,5 C370,-5 380,15 390,5 C400,-5 410,15 420,5 C430,-5 440,15 450,5 C460,-5 470,15 480,5 C490,-5 500,15 510,5 C520,-5 530,15 540,5 C550,-5 560,15 570,5 C580,-5 590,15 600,5"
                                stroke="#2b2b2b"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: '600',
                                    strokeDashoffset: '0',
                                    animation: 'draw 1s ease'
                                }}
                            />
                        </svg>
                    </span> (changed plans)<br />
                - Currently taking: Physics, Accounting, and Environmental Management<br />
                   
                </p>
            </div>
        </div>
    );
};

const styles = {
    currentlyTaking: {
        position: 'relative',
        display: 'inline-block',
    },
};

export default SchoolLife;