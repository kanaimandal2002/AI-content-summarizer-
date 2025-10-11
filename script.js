 // DOM Elements
        const tabs = document.querySelectorAll('.tab');
        const textTab = document.getElementById('text-tab');
        const urlTab = document.getElementById('url-tab');
        const textInput = document.getElementById('text-input');
        const urlInput = document.getElementById('url-input');
        const summarizeTextBtn = document.getElementById('summarize-text');
        const summarizeUrlBtn = document.getElementById('summarize-url');
        const clearTextBtn = document.getElementById('clear-text');
        const clearUrlBtn = document.getElementById('clear-url');
        const loading = document.getElementById('loading');
        const resultContainer = document.getElementById('result-container');
        const originalLength = document.getElementById('original-length');
        const summaryLength = document.getElementById('summary-length');
        const reduction = document.getElementById('reduction');
        const summaryContent = document.getElementById('summary-content');
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        
        // Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                if (tab.dataset.tab === 'text') {
                    textTab.classList.add('active');
                    urlTab.classList.remove('active');
                } else {
                    urlTab.classList.add('active');
                    textTab.classList.remove('active');
                }
                
                // Clear any existing results
                resultContainer.style.display = 'none';
                errorMessage.style.display = 'none';
            });
        });
        
        // Clear buttons
        clearTextBtn.addEventListener('click', () => {
            textInput.value = '';
            resultContainer.style.display = 'none';
            errorMessage.style.display = 'none';
        });
        
        clearUrlBtn.addEventListener('click', () => {
            urlInput.value = '';
            resultContainer.style.display = 'none';
            errorMessage.style.display = 'none';
        });
        
        // Summarize text
        summarizeTextBtn.addEventListener('click', () => {
            const text = textInput.value.trim();
            
            if (!text) {
                showError('Please enter some text to summarize.');
                return;
            }
            
            if (text.split(/\s+/).length < 50) {
                showError('Text is too short. Please provide content with at least 50 words.');
                return;
            }
            
            processContent(text, 'text');
        });
        
        // Summarize URL
        summarizeUrlBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            
            if (!url) {
                showError('Please enter a URL to summarize.');
                return;
            }
            
            if (!isValidUrl(url)) {
                showError('Please enter a valid URL.');
                return;
            }
            
            // For demo purposes, we'll use a sample article text
            // In a real app, you would fetch the content from the URL
            const sampleArticle = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. Leading AI textbooks define the field as the study of "intelligent agents": any system that perceives its environment and takes actions that maximize its chance of achieving its goals. Some popular accounts use the term "artificial intelligence" to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving", however, this definition is rejected by major AI researchers.

AI applications include advanced web search engines (e.g., Google), recommendation systems (used by YouTube, Amazon and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Tesla), automated decision-making and competing at the highest level in strategic game systems (such as chess and Go). As machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. For instance, optical character recognition is frequently excluded from things considered to be AI, having become a routine technology.

Artificial intelligence was founded as an academic discipline in 1956, and in the years since has experienced several waves of optimism, followed by disappointment and the loss of funding (known as an "AI winter"), followed by new approaches, success and renewed funding. AI research has tried and discarded many different approaches during its lifetime, including simulating the brain, modeling human problem solving, formal logic, large databases of knowledge and imitating animal behavior. In the first decades of the 21st century, highly mathematical-statistical machine learning has dominated the field, and this technique has proved highly successful, helping to solve many challenging problems throughout industry and academia.

The various sub-fields of AI research are centered around particular goals and the use of particular tools. The traditional goals of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception, and the ability to move and manipulate objects. General intelligence (the ability to solve an arbitrary problem) is among the field's long-term goals. To solve these problems, AI researchers have adapted and integrated a wide range of problem-solving techniques, including search and mathematical optimization, formal logic, artificial neural networks, and methods based on statistics, probability and economics. AI also draws upon computer science, psychology, linguistics, philosophy, and many other fields.

The field was founded on the assumption that human intelligence "can be so precisely described that a machine can be made to simulate it". This raised philosophical arguments about the mind and the ethical consequences of creating artificial beings endowed with human-like intelligence; these issues have previously been explored by myth, fiction and philosophy since antiquity. Computer scientists and philosophers have since suggested that AI may become an existential risk to humanity if its rational capacities are not steered towards beneficial goals.`;
            
            processContent(sampleArticle, 'url');
        });
        
        // Process content (simulate AI summarization)
        function processContent(content, type) {
            // Show loading
            loading.style.display = 'block';
            resultContainer.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Simulate API call delay
            setTimeout(() => {
                loading.style.display = 'none';
                
                try {
                    // Calculate stats
                    const wordCount = content.split(/\s+/).length;
                    const summary = generateSummary(content);
                    const summaryWordCount = summary.split(/\s+/).length;
                    const reductionPercent = Math.round((1 - summaryWordCount / wordCount) * 100);
                    
                    // Update UI with results
                    originalLength.textContent = wordCount;
                    summaryLength.textContent = summaryWordCount;
                    reduction.textContent = `${reductionPercent}%`;
                    summaryContent.textContent = summary;
                    
                    resultContainer.style.display = 'block';
                    
                    // Scroll to results
                    resultContainer.scrollIntoView({ behavior: 'smooth' });
                } catch (error) {
                    showError('An error occurred while summarizing the content. Please try again.');
                }
            }, 2000);
        }
        
        // Generate a summary (simulated AI)
        function generateSummary(text) {
            // This is a simplified simulation of an AI summarizer
            // In a real application, you would call an AI API
            
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            
            // Select key sentences (simplified algorithm)
            const summarySentences = [];
            
            // Always include the first sentence (usually the introduction)
            if (sentences.length > 0) {
                summarySentences.push(sentences[0].trim());
            }
            
            // Include some middle sentences
            if (sentences.length > 3) {
                const midIndex = Math.floor(sentences.length / 2);
                summarySentences.push(sentences[midIndex].trim());
            }
            
            // Include the last sentence (usually the conclusion)
            if (sentences.length > 1) {
                summarySentences.push(sentences[sentences.length - 1].trim());
            }
            
            // Join sentences to form the summary
            let summary = summarySentences.join('. ') + '.';
            
            // If the summary is still too long, truncate it
            const maxLength = 250;
            if (summary.length > maxLength) {
                summary = summary.substring(0, maxLength) + '...';
            }
            
            return summary;
        }
        
        // Show error message
        function showError(message) {
            errorText.textContent = message;
            errorMessage.style.display = 'block';
            resultContainer.style.display = 'none';
            loading.style.display = 'none';
        }
        
        // Validate URL format
        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }
        
        // Add some sample text for demo purposes
        window.addEventListener('DOMContentLoaded', () => {
            const sampleText = `The impact of climate change on global ecosystems is becoming increasingly evident. Rising temperatures, changing precipitation patterns, and more frequent extreme weather events are affecting biodiversity and ecosystem services worldwide.

Scientists have observed shifts in species distributions, with many plants and animals moving toward higher latitudes or elevations to find suitable habitats. These changes can disrupt ecological interactions, such as pollination and predator-prey relationships, potentially leading to ecosystem instability.

Marine ecosystems are particularly vulnerable to climate change. Ocean warming and acidification are causing coral bleaching and threatening the survival of coral reef ecosystems, which support approximately 25% of all marine species. Additionally, melting sea ice is reducing habitat for polar species like polar bears and seals.

Climate change also affects the timing of biological events, a phenomenon known as phenological shift. Many species are breeding, migrating, or flowering earlier in response to warmer temperatures. However, not all species are responding at the same rate, which can create mismatches in ecological relationships.

The combined effects of climate change and other human-induced stressors, such as habitat destruction and pollution, are pushing many species toward extinction. Conservation efforts are increasingly focusing on enhancing ecosystem resilience and facilitating species adaptation to changing conditions.

Addressing climate change requires global cooperation and substantial reductions in greenhouse gas emissions. Protecting and restoring natural ecosystems can also help mitigate climate change by sequestering carbon and buffering against some of its impacts.`;
            
            textInput.value = sampleText;
        });
