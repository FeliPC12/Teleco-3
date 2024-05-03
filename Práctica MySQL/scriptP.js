function getProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            // Handle data
            console.log(data);

            // Get table body
            var productListBody = document.querySelector('#product-list tbody');
            productListBody.innerHTML = ''; // Clear previous data

            // Loop through users and populate table rows
            data.forEach(product => {
                var row = document.createElement('tr');

                // Name
                var nombreCell = document.createElement('td');
                nombreCell.textContent = product.nombre;
                row.appendChild(nombreCell);

                // Email
                var costoCell = document.createElement('td');
                costoCell.textContent = product.costo;
                row.appendChild(costoCell);

                // Username
                var cantidadCell = document.createElement('td');
                cantidadCell.textContent = product.cantidad;
                row.appendChild(cantidadCell);
                
                var pesoCell = document.createElement('td');
                pesoCell.textContent = product.peso;
                row.appendChild(pesoCell);

                // Actions
                var actionsCell = document.createElement('td');

                // Edit link
                var editLink = document.createElement('a');
                editLink.href = `/editP/${product.code}`;
                //editLink.href = `edit.html?id=${user.id}`;
                editLink.textContent = 'Edit';
                editLink.className = 'btn btn-primary mr-2';
                actionsCell.appendChild(editLink);

                // Delete link
                var deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.textContent = 'Delete';
                deleteLink.className = 'btn btn-danger';
                deleteLink.addEventListener('click', function() {
                    deleteProduct(product.code);
                });
                actionsCell.appendChild(deleteLink);

                row.appendChild(actionsCell);

                productListBody.appendChild(row);

 });
        })
        .catch(error => console.error('Error:', error));
}

function createProduct() {
    var data = {
        nombre: document.getElementById('nombre').value,
        costo: document.getElementById('costo').value,
        cantidad: document.getElementById('cantidad').value,
        peso: document.getElementById('peso').value
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
          // Handle success
        console.log(data);
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}

function updateProduct() {
    var productNum = document.getElementById('product-code').value;
    var data = {
        nombre: document.getElementById('nombre').value,
        costo: document.getElementById('costo').value,
        cantidad: document.getElementById('cantidad').value,
        peso: document.getElementById('peso').value
    };

    fetch(`/api/products/${productNum}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
             }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log(data);
        // Optionally, redirect to another page or show a success message
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}



function deleteProduct(productNum) {
    console.log('Deleting product with CODE:', productNum);
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${productNum}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
               // Handle success
            console.log('Product deleted successfully:', data);
            // Reload the user list
            getProducts();
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }
}
