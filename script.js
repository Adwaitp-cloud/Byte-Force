document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Sample event data
    const events = [
        {
            id: 1,
            title: "Tech Conference 2025",
            date: "November 15, 2025",
            location: "TGPCET, Nagpur, India",
            description: "Join us for the biggest tech conference of the year featuring industry leaders and innovative technologies.",
            price: "₹1999",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 2,
            title: "Music Festival",
            date: "December 5-7, 2025",
            location: "TGPCET, Nagpur, India",
            description: "Three days of amazing music performances from top artists around the world.",
            price: "₹1499",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 3,
            title: "Startup Pitch Competition",
            date: "October 28, 2025",
            location: "TGPCET, Nagpur, India",
            description: "Witness the next big ideas as startups pitch to investors for funding.",
            price: "Free",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 4,
            title: "Art Exhibition",
            date: "November 20 - December 20, 2025",
            location: "TGPCET, Nagpur, India",
            description: "Experience contemporary art from emerging and established artists.",
            price: "₹999",
            image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
    ];

    // Populate events grid
    const eventsGrid = document.querySelector('.events-grid');
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card animate-on-scroll';
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')"></div>
            <div class="event-info">
                <span class="event-date">${event.date}</span>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p class="event-description">${event.description}</p>
                <div class="event-actions">
                    <span class="event-price">${event.price}</span>
                    <button class="btn register-btn" data-id="${event.id}">Register</button>
                </div>
            </div>
        `;
        eventsGrid.appendChild(eventCard);
    });

    // Populate event dropdown in form
    const eventSelect = document.getElementById('event');
    events.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = event.title;
        eventSelect.appendChild(option);
    });

    // Form submission
    const eventForm = document.getElementById('eventForm');
    const ticketModal = document.getElementById('ticketModal');
    const closeModal = document.querySelector('.close-modal');
    
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const eventId = document.getElementById('event').value;
        const tickets = document.getElementById('tickets').value;
        
        // Find selected event
        const selectedEvent = events.find(event => event.id == eventId);
        
        // Update ticket modal with user and event info
        document.getElementById('ticketUserName').textContent = name;
        document.getElementById('ticketUserEmail').textContent = email;
        document.getElementById('ticketQuantity').textContent = tickets;
        document.getElementById('ticketEventName').textContent = selectedEvent.title;
        document.getElementById('ticketEventDate').textContent = `Date: ${selectedEvent.date}`;
        document.getElementById('ticketEventLocation').textContent = `Location: ${selectedEvent.location}`;
        
        // Generate QR code
        const qrCodeElement = document.getElementById('qrCode');
        qrCodeElement.innerHTML = '';
        const qrCode = new QRCode(qrCodeElement, {
            text: `Event: ${selectedEvent.title}|User: ${name}|Email: ${email}|Tickets: ${tickets}`,
            width: 120,
            height: 120,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Show modal
        ticketModal.style.display = 'flex';
        
        // In a real app, you would send this data to the server here
        // For this demo, we'll just show the ticket
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        ticketModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === ticketModal) {
            ticketModal.style.display = 'none';
        }
    });

    // Download ticket
    const downloadTicket = document.getElementById('downloadTicket');
    downloadTicket.addEventListener('click', () => {
        const ticketElement = document.querySelector('.ticket-preview');
        
        html2canvas(ticketElement).then(canvas => {
            const link = document.createElement('a');
            link.download = 'event-ticket.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // Send ticket to email
    const sendToEmail = document.getElementById('sendToEmail');
    sendToEmail.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        alert(`Ticket has been sent to ${email}`);
        ticketModal.style.display = 'none';
    });

    // Register buttons on event cards
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('register-btn')) {
            const eventId = e.target.getAttribute('data-id');
            document.getElementById('event').value = eventId;
            
            window.scrollTo({
                top: document.getElementById('register').offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });

    // FAB button
    const fab = document.querySelector('.fab');
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: document.getElementById('register').offsetTop - 80,
            behavior: 'smooth'
        });
    });

    // Scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Form validation
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});