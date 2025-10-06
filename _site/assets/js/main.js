document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // Theme Toggle
    const html = document.documentElement;
    html.setAttribute('data-bs-theme', 'light');

    // Back to Top and Scroll Progress
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const scrollProgressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Back to top button visibility
        if (window.pageYOffset > 300) {
            if (backToTopBtn) backToTopBtn.style.display = 'flex';
        } else {
            if (backToTopBtn) backToTopBtn.style.display = 'none';
        }

        // Scroll progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgressBar) scrollProgressBar.style.width = scrolled + '%';
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            };

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive Quiz
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        const questions = quizForm.querySelectorAll('.quiz-question');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');
        const quizResult = document.getElementById('quiz-result');
        const quizProgress = document.getElementById('quiz-progress');
        const currentQuestionSpan = document.getElementById('current-question');
        const totalQuestionsSpan = document.getElementById('total-questions');
        
        let currentQuestionIndex = 0;
        const totalQuestions = questions.length;
        if (totalQuestionsSpan) totalQuestionsSpan.textContent = totalQuestions;

        const answers = { q1: 'b', q2: 'c', q3: 'a', q4: 'b', q5: 'c' };

        const showQuestion = (index) => {
            questions.forEach((q, i) => {
                q.style.display = i === index ? 'block' : 'none';
            });
            if(currentQuestionSpan) currentQuestionSpan.textContent = index + 1;
            if(quizProgress) quizProgress.style.width = `${((index + 1) / totalQuestions) * 100}%`;
            
            if(prevBtn) prevBtn.disabled = index === 0;
            if(nextBtn) nextBtn.style.display = index === totalQuestions - 1 ? 'none' : 'inline-block';
            if(submitBtn) submitBtn.style.display = index === totalQuestions - 1 ? 'inline-block' : 'none';
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentQuestionIndex < totalQuestions - 1) {
                    currentQuestionIndex++;
                    showQuestion(currentQuestionIndex);
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    showQuestion(currentQuestionIndex);
                }
            });
        }

        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let score = 0;
            
            for (const [question, correctAnswer] of Object.entries(answers)) {
                const selected = document.querySelector(`input[name="${question}"]:checked`);
                const questionElement = document.getElementById(`question-${question.substring(1)}`);
                
                if (selected) {
                    const selectedOptionLabel = selected.closest('.quiz-option');
                    
                    if (selected.value === correctAnswer) {
                        score++;
                        if (selectedOptionLabel) selectedOptionLabel.classList.add('correct');
                    } else {
                        if (selectedOptionLabel) selectedOptionLabel.classList.add('incorrect');
                        const correctOptionInput = document.querySelector(`input[name="${question}"][value="${correctAnswer}"]`);
                        if (correctOptionInput) {
                            const correctOptionLabel = correctOptionInput.closest('.quiz-option');
                            if (correctOptionLabel) correctOptionLabel.classList.add('correct');
                        }
                    }
                }
            }

            const percentage = Math.round((score / totalQuestions) * 100);
            let resultClass, resultMessage;

            if (percentage >= 80) {
                resultClass = 'success';
                resultMessage = 'Excellent! You know your history!';
            } else if (percentage >= 50) {
                resultClass = 'primary';
                resultMessage = 'Good job! Keep learning!';
            } else {
                resultClass = 'warning';
                resultMessage = 'Keep studying! You\'ll get there!';
            }

            if (quizResult) {
                quizResult.innerHTML = `
                    <div class="alert alert-${resultClass} mt-4">
                        <h4 class="alert-heading">${resultMessage}</h4>
                        <p>You scored ${score} out of ${totalQuestions} (${percentage}%)</p>
                    </div>
                    <button class="btn btn-outline-${resultClass} mt-3" onclick="location.reload()">
                        <i class="fas fa-redo me-2"></i>Try Again
                    </button>
                `;
                quizResult.style.display = 'block';
                quizResult.scrollIntoView({ behavior: 'smooth' });
            }
            
            if(submitBtn) submitBtn.style.display = 'none';
            if(prevBtn) prevBtn.style.display = 'none';
        });

        showQuestion(currentQuestionIndex);
    }

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'none';
                }
            });
        }, { threshold: 0.1 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = 0;
            if (item.classList.contains('left')) {
                item.style.transform = 'translateX(-100px)';
            } else {
                item.style.transform = 'translateX(100px)';
            }
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(item);
        });
    }
    
    // Document Modal on the main page
    const documentModal = document.getElementById('documentModal');
    if (documentModal) {
        documentModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            
            // Get data from the button
            const title = button.getAttribute('data-title');
            const imgSrc = button.getAttribute('data-img');
            const description = button.getAttribute('data-desc');
            const fullDocUrl = button.getAttribute('data-full-doc-url');

            // Get modal elements
            const modalTitle = documentModal.querySelector('#documentModalLabel');
            const modalImage = documentModal.querySelector('#documentImage');
            const modalDescription = documentModal.querySelector('#documentDescription');
            const viewFullDocBtn = documentModal.querySelector('#viewFullDocument');

            // Populate modal with data
            modalTitle.textContent = title;
            modalImage.src = imgSrc;
            modalImage.alt = title;
            modalDescription.textContent = description;

            // Handle the "View Full Document" button
            if (fullDocUrl) {
                viewFullDocBtn.href = fullDocUrl;
                viewFullDocBtn.style.display = 'inline-block'; // Show the button
                
                // Add a click listener to ensure navigation
                viewFullDocBtn.onclick = function() {
                    window.location.href = fullDocUrl;
                };
                
            } else {
                viewFullDocBtn.style.display = 'none'; // Hide the button if no URL is provided
                viewFullDocBtn.onclick = null; // Remove any previous listener
            }
        });
    }
});
