import { useState, useEffect } from 'react';

const DisplayTrivia = (props) => {
    const [userChoice, setUserChoice] = useState('');
    const [safeQuestion, setSafeQuestion] = useState('');
    const [safeAnswer, setSafeAnswer] = useState('');
    const [answerCheck, setAnswerCheck] = useState();

        

    useEffect( () => { 
        const allAnswersArray = [];
        const incorrect = props.question.incorrectAnswer;
        allAnswersArray.push(incorrect[0], incorrect[1], incorrect[2]);
        allAnswersArray.push(props.question.correctAnswer);
        const shuffledAnswers = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
            while (currentIndex !== 0) {
                 randomIndex = Math.floor(Math.random() * currentIndex);
                 currentIndex -= 1;
                 temporaryValue = array[currentIndex];
                 array[currentIndex] = array[randomIndex];
                 array[randomIndex] = temporaryValue;
            };
        }
        shuffledAnswers(allAnswersArray);

        const placeholder = document.createElement('div');
        placeholder.innerHTML = props.question.question;
        const safeQuestion = placeholder.textContent;

        const newShuffleAnswer = allAnswersArray.map((array) => {
            const placeholderTwo = document.createElement('div');
            placeholderTwo.innerHTML = array;
            const safeAnswers = placeholderTwo.textContent;
            return safeAnswers;
        });
        setSafeQuestion(safeQuestion);
        setSafeAnswer(newShuffleAnswer);
    
    }, [props.question.correctAnswer, props.question.incorrectAnswer, props.question.question]);
    console.log(props.question.correctAnswer)

    const userSubmit = (e) => {
        e.preventDefault();
        if (userChoice === props.question.correctAnswer) {
            setAnswerCheck(true);
            popUpEffect();
            props.counterSystem();
        }else {
            setAnswerCheck(false);
            popUpEffect();
        }
        props.setIndex(props.index + 1);
    }

    const popUpEffect = () => {
        setTimeout(() => {
            setAnswerCheck(undefined);
        }, 2000);
    }

    const handleChange = (e) => {
        setUserChoice(e.target.value);
    }
    return (
        <div className="questionBox">
            <div className="questionContainer">
                <h2>Question #{props.index + 1}</h2>
                <p className="question">{safeQuestion}</p>
            </div>
            {
                props.question.incorrectAnswer.length === 1 ? (
                    <form action="submit" onSubmit={userSubmit} >
                        <fieldset>
                            <div className="answerChoices">
                                <div className="answer">
                                    <input type="radio" name="trueFalse" id="true" value="True" onChange={handleChange} required/>
                                    <label htmlFor="true">True</label>
                                </div>
                    
                                <div className="answer">
                                    <input type="radio" name="trueFalse" id="false" value="False" onChange={handleChange}/>
                                    <label htmlFor="false">False</label>
                                </div>
                            </div>
                            <button type="submit" className="submitAnswer">Submit Answer</button>
                        </fieldset>
                    </form>
                ) : (
                    <form action="submit" onSubmit={userSubmit}>
                        <fieldset>
                            <div className="answerChoices">
                                <div className="answer">
                                    <input type="radio" name="multipleChoice" id="answerOne" value={safeAnswer[0]} onChange={handleChange}  required/>
                                    <label htmlFor="answerOne">{safeAnswer[0]}</label>
                                </div>
                                
                                <div className="answer">
                                    <input type="radio" name="multipleChoice" id="answerTwo" value={safeAnswer[1]} onChange={handleChange}/>
                                    <label htmlFor="answerTwo">{safeAnswer[1]}</label>
                                </div>

                                <div className="answer">
                                    <input type="radio" name="multipleChoice" id="answerThree" value={safeAnswer[2]} onChange={handleChange}/>
                                    <label htmlFor="answerThree">{safeAnswer[2]}</label>
                                </div>
                            </div>

                            <div className="answer">
                                <input type="radio" name="multipleChoice" id="answerFour" value={safeAnswer[3]} onChange={handleChange}/>
                                <label htmlFor="answerFour">{safeAnswer[3]}</label>
                            </div>
                            <button type="submit" className="submitAnswer">Submit Answer</button>
                        </fieldset>
                    </form>
                )
            }

            {
                answerCheck === true ? (
                    <div className="popUpContainer">
                        <div className="popUp">
                            <h2 className="answerCheck">You are correct!</h2>
                        </div>
                    </div>
                ) : answerCheck === false ? (
                    <div className="popUpContainer">
                        <div className="popUp">
                            <h2 className="answerCheck">You are wrong!</h2>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
    }

export default DisplayTrivia;