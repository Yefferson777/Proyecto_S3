document.addEventListener('DOMContentLoaded', () => {
    const application = document.querySelector('.flex-Main');
    const apiurl = 'http://localhost:4000/api/servicios';
    const baseUrl = 'http://localhost:4000/'; // URL base de tu servidor

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(servicio => {
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');
                const imageUrl = servicio.image ? `${baseUrl}${servicio.image}` : 'https://via.placeholder.com/150';
                card.innerHTML = `
                    <div class="card">
                        <img src="${imageUrl}" class="card-img-top" alt="${servicio.name}" data-toggle="modal" data-target="#imageModal" data-image="${imageUrl}">
                        <div class="card-body">
                            <h5 class="card-title">${servicio.name}</h5>
                            <p class="card-text">${servicio.price_uni}$</p>
                        </div>
                    </div>
                `;
                application.appendChild(card);
            });
        });

    $('#imageModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var imageUrl = button.data('image');
        var modal = $(this);
        modal.find('#modalImage').attr('src', imageUrl);
    });
});

