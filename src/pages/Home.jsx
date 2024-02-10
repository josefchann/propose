import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GenQoutes from '../components/GenQoutes';
import { images } from '../data/preload-image-list.json';
import { propose, qoutes } from '../data/quotes.json';
import { genRandom } from '../utills';


const Proposal = ({ className = '' }) => {
    const { id } = useParams();

    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState({
        image: '/images/image-1.jpg',
        subtext: 'It is that time of the year again hohoho',
    });

    const [showYesPopUp, setShowYesPopUp] = useState(false);

    const [showNoPopUp, setShowNoPopUp] = useState(false);

    const handleYes = () => {
        setShowYesPopUp(true);
    };

    const handleNo = () => {
        setShowNoPopUp(true);
    }
    

    // add quotes
    const addQoutes = () => {
        const qoute = texts.length >= qoutes.length ? propose : genRandom(qoutes, texts);
        setCurrentText((prevData) => ({ ...prevData, ...qoute }));
        setTexts((prevData) => [...prevData, qoute]);
    };

    // handle click
    const handleClick = (e) => {
        const button = e.target;
        // remove previous shaking effect
        button.classList.remove('shake');
        // add quote
        addQoutes();
        // add shaking effect
        button.classList.add('shake');
        // remove shaking effect
        setTimeout(() => {
            button.classList.remove('shake');
        }, 1000);
    };

    // effects
    useEffect(() => {
        document.title = `Bei, Will You Be My Valentine?`;
    });

    // preload images
    useEffect(() => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    return (
        <div
            className={`proposal ${className}`}
            style={{
                '--image': `url(${currentText.image})`,
            }}
        >
            <div className="proposal_media bg-dark d-none d-md-block" />
            <Container>
                <Row>
                    <Col md={6} className="ms-auto">
                        <div className="proposal_content py-5">
                            <div className="proposal_header">
                                <h1 className="proposal_title h4">
                                    HARLOWWWW <b>BEI</b>
                                </h1>
                                <p className="propsal_subtitle">{currentText.subtext}</p>
                            </div>

                            <GenQoutes texts={texts} className="main-content" />

                            {currentText.id !== 'finished' ? (
                                <Button variant="danger" onClick={handleClick}>
                                    {texts.length ? 'Next' : 'Continue'}
                                </Button>
                            ) : (
                                <div>
                                    <span>
                                        Will you be my valentines? 
                                        <br/>
                                        <br/>
                                    </span>
                                    <Button className="yes-btn" variant='danger' onClick={handleYes}>
                                        Yes
                                    </Button>
                                    <Button className="no-btn" variant="danger--primary" onClick={handleNo}>
                                        No 
                                    </Button>
                                    <style jsx>{`
                                    .yes-btn {
                                        margin-right: 20px;
                                    }

                                    .popup {
                                        position: fixed;
                                        top: 0;
                                        left: 0;
                                        width: 100%;
                                        height: 100%;
                                        background-color: rgba(0, 0, 0, 0.5);
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                    .popup-content {
                                        background-color: white;
                                        padding: 20px;
                                        border-radius: 8px;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                    }

                                    .goofy{
                                        width: 35%;
                                        height: auto;
                                    }

                                    .goofy-comment{
                                        text-align: center;
                                        font-size: 20px;
                                        margin-top: 20px;
                                    }

                                    
                                    `}
                                    </style>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            {showYesPopUp && (
                <div className="popup">
                    <div className="popup-content">
                        <img className="goofy" src="/images/goofy.jpg" />
                        <p className="goofy-comment">Here's to more goofy moments like this with you hehehe</p>
                        <Button className="close-btn" onClick={() => setShowYesPopUp(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
            {showNoPopUp && (
                <div className="popup">
                    <div className="popup-content">
                        <img className="goofy" src="/images/sad.jpg" />
                        <p className="goofy-comment">I know you're just kidding. Please don't make me sad</p>
                        <Button className="close-btn" onClick={() => setShowNoPopUp(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Proposal;
