document.addEventListener('DOMContentLoaded', function() {
    // Enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentUrl.endsWith(linkPath)) {
            link.classList.add('active');
        }
    });

    // Carrusel de servicios
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselTrack = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    // Carrusel de proyectos destacados
    const prevButtonProjects = document.querySelector('.featured-projects .prev');
    const nextButtonProjects = document.querySelector('.featured-projects .next');
    const carouselTrackProjects = document.querySelector('.featured-projects .carousel-track');
    const projectItems = document.querySelectorAll('.featured-projects .project-item');
    let currentIndexProjects = 0;

    prevButtonProjects.addEventListener('click', () => {
        if (currentIndexProjects > 0) {
            currentIndexProjects--;
            updateCarouselPositionProjects();
        }
    });

    nextButtonProjects.addEventListener('click', () => {
        if (currentIndexProjects < Math.ceil(projectItems.length / 3) - 1) {
            currentIndexProjects++;
            updateCarouselPositionProjects();
        }
    });

    function updateCarouselPositionProjects() {
        const itemWidth = projectItems[0].clientWidth;
        const gap = 40; // Tamaño del margen lateral
        const offset = (carouselTrackProjects.clientWidth - (itemWidth * 3 + gap * 2)) / 2;
        carouselTrackProjects.style.transform = `translateX(calc(-${currentIndexProjects * (itemWidth * 3 + gap * 2)}px + ${offset}px))`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("valor-header");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }

    var menuToggle = document.querySelector(".menu-toggle");
    var navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", function() {
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "flex";
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            projects.forEach(project => {
                if (filter === 'todos') {
                    project.style.display = 'block';
                } else {
                    const projectStatus = project.getAttribute('data-status');
                    if (projectStatus === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const projectsPerPage = 9; // 3 columnas * 3 filas
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let filteredProjects = Array.from(projects);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Activar el botón seleccionado y desactivar los demás
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            filteredProjects = filter === 'todos'
                ? Array.from(projects)
                : Array.from(projects).filter(project => project.getAttribute('data-status') === filter);

            createPaginationButtons(Math.ceil(filteredProjects.length / projectsPerPage));
            changePage(1);
        });
    });

    function createPaginationButtons(totalPages) {
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'page-btn';
            pageButton.innerText = i;
            pageButton.addEventListener('click', function() {
                changePage(i);
            });
            paginationContainer.appendChild(pageButton);
        }
        document.querySelector('main').appendChild(paginationContainer);
    }

    function changePage(page) {
        const start = (page - 1) * projectsPerPage;
        const end = start + projectsPerPage;

        filteredProjects.forEach((project, index) => {
            if (index >= start && index < end) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });

        document.querySelectorAll('.page-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.page-btn')[page - 1].classList.add('active');
    }
    
    createPaginationButtons(Math.ceil(filteredProjects.length / projectsPerPage));
    changePage(1); // Mostrar la primera página por defecto
});

document.addEventListener('DOMContentLoaded', function() {
    const servicesPerPage = 9; // 3 columnas * 3 filas
    const services = document.querySelectorAll('.services-card');
    const filterButtons = document.querySelectorAll('.services-filter-btn');
    let filteredServices = Array.from(services);
    const paginationContainer = document.querySelector('.services-pagination');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Activar el botón seleccionado y desactivar los demás
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            filteredServices = filter === 'todos'
                ? Array.from(services)
                : Array.from(services).filter(service => service.getAttribute('data-category') === filter);

            createPaginationButtons(Math.ceil(filteredServices.length / servicesPerPage));
            changePage(1);
        });
    });

    function createPaginationButtons(totalPages) {
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'page-btn';
            pageButton.innerText = i;
            pageButton.addEventListener('click', function() {
                changePage(i);
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    function changePage(page) {
        const start = (page - 1) * servicesPerPage;
        const end = start + servicesPerPage;

        filteredServices.forEach((service, index) => {
            if (index >= start && index < end) {
                service.style.display = 'block';
            } else {
                service.style.display = 'none';
            }
        });

        document.querySelectorAll('.page-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.page-btn')[page - 1].classList.add('active');
    }
    
    createPaginationButtons(Math.ceil(filteredServices.length / servicesPerPage));
    changePage(1); // Mostrar la primera página por defecto
});

document.addEventListener('DOMContentLoaded', function() {
    const services = document.querySelectorAll('.services-card');
    const filterButtons = document.querySelectorAll('.services-filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Activar el botón seleccionado y desactivar los demás
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrar los servicios según la categoría
            services.forEach(service => {
                if (filter === 'todos' || service.getAttribute('data-category') === filter) {
                    service.style.display = 'block';
                } else {
                    service.style.display = 'none';
                }
            });
        });
    });

    // Inicializar con el filtro "todos"
    document.querySelector('.services-filter-btn[data-filter="todos"]').click();
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Aquí puedes agregar la lógica para procesar y enviar el formulario
    document.getElementById('confirmation-message').style.display = 'block';
  });
  
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('show');
  });
  