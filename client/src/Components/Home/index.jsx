import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import './index.css';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null); // Track selected game for modal

    const gamesData = [
        {
            title: "Math Challenge",
            description: "Test your math skills with exciting quizzes and challenges.",
            imageUrl: "https://tse2.mm.bing.net/th?id=OIP.y0-ac0DVPVFPmjSi_k51xgHaEK&pid=Api&P=0&h=180",
            link: "/games/math",
            gameContent: "Math challenge game content here!" // Placeholder for the actual game
        },
        {
            title: "Science Trivia",
            description: "Answer interesting science questions and improve your knowledge.",
            imageUrl: "https://tse1.mm.bing.net/th?id=OIP.0enNE5zSaXLf4EuKwKMTYgHaEM&pid=Api&P=0&h=180",
            link: "/games/science",
            gameContent: "Science trivia game content here!" // Placeholder for the actual game
        },
        {
            title: "History Quest",
            description: "Explore historical events and solve puzzles based on history.",
            imageUrl: "https://tse3.mm.bing.net/th?id=OIP.muGNeXCI6yDFgWDnvOIRkQHaEK&pid=Api&P=0&h=180",
            link: "/games/history",
            gameContent: "History quest game content here!" // Placeholder for the actual game
        },
        {
            title: "Coding Challenge",
            description: "Solve coding problems and improve your programming skills.",
            imageUrl: "https://tse1.mm.bing.net/th?id=OIP.F1qIp6RJYlc9U-YDO_gMogHaEK&pid=Api&P=0&h=180",
            link: "/games/coding",
            gameContent: "Coding challenge game content here!" // Placeholder for the actual game
        }
    ];

    // Function to handle opening the modal with the selected game
    const openModal = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    return (
        <div>
            <Header />
            <div className="home-page">
                <h1 className="home-page-title">Welcome to the Learning Games</h1>
                <p>Gain Knowledge with fun.</p>
                <div className="game-categories">
                    {gamesData.map((game, index) => (
                        <motion.div
                            key={index}
                            className="game-card"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                src={game.imageUrl}
                                alt={game.title}
                                className="game-image"
                                onClick={() => openModal(game)} // Open modal on image click
                            />
                            <div className="game-details">
                                <h2 className="game-title">{game.title}</h2>
                                <p className="game-description">{game.description}</p>
                                <button className="game-link" onClick={() => openModal(game)}>
                                    Start Game
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal to show the selected game */}
                {isModalOpen && selectedGame && (
                    <div className="modal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>{selectedGame.title}</h2>
                            <p className="paragraph-home">{selectedGame.gameContent}</p> {/* Display game content here */}
                            <button className="close-button" onClick={closeModal}>
                                X
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
