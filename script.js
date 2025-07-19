// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoriesList = document.getElementById('categories');
const articlesList = document.getElementById('articlesList');
const addArticleBtn = document.getElementById('addArticleBtn');
const addArticleModal = document.getElementById('addArticleModal');
const articleForm = document.getElementById('articleForm');

// Sample articles data (replace with actual data storage)
let articles = [
    {
        id: 1,
        title: 'Getting Started with Test Automation',
        category: 'Automation',
        content: 'Learn the basics of test automation...'
    },
    {
        id: 2,
        title: 'Best Practices in SQA',
        category: 'SQA',
        content: 'Essential quality assurance practices...'
    }
];

// Automation tiles data
const automationTiles = [
    {
        id: 1,
        title: 'Automation Framework',
        description: 'Core automation framework components, design patterns, and best practices',
        icon: '⚙️',
        link: 'docs/CRAFT OpenSource Credit Document.pdf'
    },
    {
        id: 2,
        title: 'Tool Inventory',
        description: 'Catalog of automation tools, licenses, and usage guidelines',
        icon: '🛠️'
    },
    {
        id: 3,
        title: 'Script Library',
        description: 'Repository of reusable test scripts and utilities',
        icon: '📚',
        link: 'https://github.com/'
    },
    {
        id: 4,
        title: 'CI/CD',
        description: 'Continuous Integration and Deployment pipeline configurations',
        icon: '🔄'
    },
    {
        id: 5,
        title: 'Automation Metrics',
        description: 'Test execution analytics, coverage reports, and KPIs',
        icon: '📊'
    }
];

// Event Listeners
searchInput.addEventListener('input', filterArticles);
categoriesList.addEventListener('click', handleCategoryClick);
addArticleBtn.addEventListener('click', openModal);
articleForm.addEventListener('submit', handleArticleSubmit);
document.querySelector('.cancel').addEventListener('click', closeModal);

// Functions
function filterArticles() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('#categories .active').textContent;
    
    if (activeCategory === 'Automation') {
        displayAutomationTiles(searchTerm);
        return;
    }

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
                            article.content.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === article.category;
        return matchesSearch && matchesCategory;
    });
    
    displayArticles(filteredArticles);
}

function handleCategoryClick(e) {
    if (e.target.tagName === 'LI') {
        // Update active category
        document.querySelector('#categories .active').classList.remove('active');
        e.target.classList.add('active');
        
        // Filter articles
        filterArticles();
    }
}

function displayArticles(articlesToShow) {
    articlesList.innerHTML = '';
    
    if (articlesToShow.length === 0) {
        articlesList.innerHTML = '<div class="no-results">No articles found</div>';
        return;
    }
    
    articlesToShow.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
            <span class="category">${article.category}</span>
            <h3>${article.title}</h3>
            <p>${article.content.substring(0, 150)}...</p>
        `;
        articlesList.appendChild(articleCard);
    });
}

function displayAutomationTiles(searchTerm = '') {
    articlesList.innerHTML = '';
    
    const filteredTiles = automationTiles.filter(tile =>
        tile.title.toLowerCase().includes(searchTerm) ||
        tile.description.toLowerCase().includes(searchTerm)
    );

    if (filteredTiles.length === 0) {
        articlesList.innerHTML = '<div class="no-results">No automation tiles found</div>';
        return;
    }

    // Add back button
    const backButton = document.createElement('div');
    backButton.className = 'automation-tile back-button';
    backButton.innerHTML = `
        <div class="tile-icon">⬅️</div>
        <h3>Back to Articles</h3>
    `;
    articlesList.appendChild(backButton);

    // Display filtered tiles
    filteredTiles.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.className = 'automation-tile';
        if (tile.link) {
            tileElement.style.cursor = 'pointer';
            tileElement.addEventListener('click', () => {
                window.open(tile.link, '_blank');
            });
        }
        tileElement.innerHTML = `
            <div class="tile-icon">${tile.icon}</div>
            <h3>${tile.title}</h3>
            <p>${tile.description}</p>
        `;
        articlesList.appendChild(tileElement);
    });
}

function openModal() {
    addArticleModal.style.display = 'block';
}

function closeModal() {
    addArticleModal.style.display = 'none';
    articleForm.reset();
}

function handleArticleSubmit(e) {
    e.preventDefault();
    
    const newArticle = {
        id: articles.length + 1,
        title: document.getElementById('articleTitle').value,
        category: document.getElementById('articleCategory').value,
        content: document.getElementById('articleContent').value
    };
    
    articles.push(newArticle);
    closeModal();
    filterArticles();
}

// Initial display
filterArticles(); 