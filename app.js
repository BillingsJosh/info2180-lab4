document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const outputDiv = document.getElementById('output');

    
    const sanitizeInput = (input) => {
        return input.replace(/[<>{}]/g, '').trim();
    };

   
    const fetchSuperheroes = async (query = '') => {
        try {
            const sanitizedQuery = sanitizeInput(query);
            const url = sanitizedQuery 
                ? `http://localhost/info2180-lab4/superheroes.php?query=${encodeURIComponent(sanitizedQuery)}`
                : 'http://localhost/info2180-lab4/superheroes.php';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const htmlContent = await response.text();
            
            if (htmlContent.includes('SUPERHERO NOT FOUND')) {
                outputDiv.innerHTML = '<div class="not-found">SUPERHERO NOT FOUND</div>';
                return;
            }

            if (!query) {
                alert(htmlContent.replace(/<[^>]*>/g, '').trim());
            }
            
            outputDiv.innerHTML = htmlContent;

            if (htmlContent.includes('<ul>')) {
                const listItems = outputDiv.querySelectorAll('li');
                listItems.forEach(li => {
                    if (!li.textContent.startsWith('•')) {
                        li.textContent = li.textContent;
                    }
                });
            }
        } catch (error) {
            console.error(error);
            outputDiv.innerHTML = '<div class="error">Failed to load superhero data.</div>';
        }
    };

    searchButton.addEventListener('click', () => {
        fetchSuperheroes(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchSuperheroes(searchInput.value);
        }
    });
});