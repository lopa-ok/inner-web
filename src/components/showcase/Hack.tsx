import React, { useEffect, useState, useCallback } from 'react';
import colors from '../../constants/colors';
import twitterIcon from '../../assets/pictures/contact-twitter.png';
import ghIcon from '../../assets/pictures/contact-gh.png';
import inIcon from '../../assets/pictures/contact-in.png';

export interface ContactProps {}

// function to validate phone number
const validatePhoneNumber = (phone: string) => {
    const re = /^\d{11}$/; // Simple regex for 10 digit phone number
    return re.test(String(phone));
};

interface SocialBoxProps {
    icon: string;
    link: string;
}

const SocialBox: React.FC<SocialBoxProps> = ({ link, icon }) => {
    return (
        <a rel="noreferrer" target="_blank" href={link}>
            <div className="big-button-container" style={styles.social}>
                <img src={icon} alt="" style={styles.socialImage} />
            </div>
        </a>
    );
};

const Contact: React.FC<ContactProps> = (props) => {
    const [grade, setGrade] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [mathGroup, setMathGroup] = useState('');
    const [ictGroup, setIctGroup] = useState('');
    const [arabicGroup, setArabicGroup] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formMessageColor, setFormMessageColor] = useState('');

    useEffect(() => {
        if (validatePhoneNumber(phone) && name.length > 0 && grade.length > 0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [phone, name, grade]);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (isFormValid) {
            setIsLoading(true);
            fetch('https://formspree.io/f/xwkgrndr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade,
                    phone,
                    name,
                    mathGroup,
                    ictGroup,
                    arabicGroup,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        setFormMessage(
                            `Registration successfully submitted. Thank you ${name}!`
                        );
                        setGrade('');
                        setPhone('');
                        setName('');
                        setMathGroup('');
                        setIctGroup('');
                        setArabicGroup('');
                        setFormMessageColor(colors.blue);
                        setIsLoading(false);
                    } else {
                        setFormMessage(
                            'There was an error submitting your registration. Please try again.'
                        );
                        setFormMessageColor(colors.red);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    setFormMessage(
                        'There was an error submitting your registration. Please try again.'
                    );
                    setFormMessageColor(colors.red);
                    setIsLoading(false);
                });
        } else {
            setFormMessage('Form unable to validate, please try again.');
            setFormMessageColor('red');
        }
    }, [grade, phone, name, mathGroup, ictGroup, arabicGroup, isFormValid]);

    useEffect(() => {
        if (formMessage.length > 0) {
            setTimeout(() => {
                setFormMessage('');
                setFormMessageColor('');
            }, 4000);
        }
    }, [formMessage]);

    return (
        <div className="site-page-content">
            <div style={styles.header}>
                <h1>Tech Club Registration</h1>
                <div style={styles.socials}>
                    <SocialBox link="https://twitter.com" icon={twitterIcon} />
                    <SocialBox link="https://github.com" icon={ghIcon} />
                    <SocialBox link="https://linkedin.com" icon={inIcon} />
                </div>
            </div>
            <div className="text-block">
                <p>
                    <b>Interested in joining the Tech club? Fill out the form below to register!</b>
                    <br />
                    Edit: this a thing just for the people in my school sorry for a any confusion
                </p>
                <br />

                <div style={styles.form}>
                    <label>
                        <p>
                            {!name && <span style={styles.star}>*</span>}
                            <b>Your name:</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>
                        <p>
                            {!validatePhoneNumber(phone) && (
                                <span style={styles.star}>*</span>
                            )}
                            <b>Phone Number:</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label>
                        <p>
                            {!grade && <span style={styles.star}>*</span>}
                            <b>Grade:</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="text"
                        name="grade"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                    <label>
                        <p>
                            <b>Math Group:</b>
                        </p>
                    </label>
                    <select
                        style={{ ...styles.formItem, ...styles.retroSelect }}
                        value={mathGroup}
                        onChange={(e) => setMathGroup(e.target.value)}
                    >
                        <option value="">Select Group</option>
                        <option value="Group 1">Group 1</option>
                        <option value="Group 2">Group 2</option>
                        <option value="None">Don't take this subject</option>
                    </select>
                    <label>
                        <p>
                            <b>ICT Group:</b>
                        </p>
                    </label>
                    <select
                        style={{ ...styles.formItem, ...styles.retroSelect }}
                        value={ictGroup}
                        onChange={(e) => setIctGroup(e.target.value)}
                    >
                        <option value="">Select Group</option>
                        <option value="Group 1">Group 1</option>
                        <option value="Group 2">Group 2</option>
                        <option value="None">Don't take this subject</option>
                    </select>
                    <label>
                        <p>
                            <b>Arabic Group:</b>
                        </p>
                    </label>
                    <select
                        style={{ ...styles.formItem, ...styles.retroSelect }}
                        value={arabicGroup}
                        onChange={(e) => setArabicGroup(e.target.value)}
                    >
                        <option value="">Select Group</option>
                        <option value="Group 1">Group 1</option>
                        <option value="Group 2">Group 2</option>
                        <option value="None">Don't take this subject</option>
                    </select>
                    <div style={styles.buttons}>
                        <button
                            className="site-button"
                            style={styles.button}
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            onClick={handleSubmit}
                        >
                            {!isLoading ? (
                                'Submit Registration'
                            ) : (
                                <p className="loading">Submitting</p>
                            )}
                        </button>
                        <div style={styles.formInfo}>
                            <p
                                style={Object.assign(
                                    {},
                                    { color: formMessageColor }
                                )}
                            >
                                <b>
                                    <sub>
                                        {formMessage
                                            ? `${formMessage}`
                                            : ' All registrations get forwarded straight to my personal email. be mindfull :)'}
                                    </sub>
                                </b>
                            </p>
                            <p>
                                <sub>
                                    {!isFormValid ? (
                                        <span>
                                            <b style={styles.star}>*</b> =
                                            required
                                        </span>
                                    ) : (
                                        '\xa0'
                                    )}
                                </sub>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    form: {
        flexDirection: 'column',
        marginTop: 32,
    },
    formItem: {
        marginTop: 4,
        marginBottom: 16,
    },
    retroSelect: {
        backgroundColor: '#f0e68c',
        border: '2px solid #000',
        borderRadius: '4px',
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: '16px',
        color: '#000',
        padding: '8px',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
    },
    socialImage: {
        width: 36,
        height: 36,
    },
    buttons: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formInfo: {
        textAlign: 'right',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingLeft: 24,
    },
    star: {
        paddingRight: 4,
        color: 'red',
    },
    button: {
        minWidth: 184,
        height: 32,
    },
    header: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    socials: {
        marginBottom: 16,
        justifyContent: 'flex-end',
    },
    social: {
        width: 4,
        height: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
};

export default Contact;