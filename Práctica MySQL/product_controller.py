from flask import Blueprint, request, jsonify
from users.models.product_model import Products
from users.models.db import db

product_controller = Blueprint('product_controller', __name__)

@product_controller.route('/api/products', methods=['GET'])
def get_products():
    print("listado de productos")
    products = Products.query.all()
    result = [{'code':product.code, 'nombre': product.nombre, 'costo': product.costo, 'cantidad': product.cantidad, 'peso':product.peso} for product in products]
    return jsonify(result)

# Get single user by id
@product_controller.route('/api/products/<int:product_code>', methods=['GET'])
def get_product(product_code):
    print("obteniendo producto")
    product = Products.query.get_or_404(product_code)
    return jsonify({'code':product.code, 'nombre': product.nombre, 'costo': product.costo, 'cantidad': product.cantidad, 'peso':product.peso})

@product_controller.route('/api/products', methods=['POST'])
def create_product():
    print("creando producto")
    data = request.json
    #new_user = Users(name="oscar", email="oscar@gmail", username="omondragon", password="123")
    new_product = Products(nombre=data['nombre'], costo=data['costo'], cantidad=data['cantidad'], peso=data['peso'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

# Update an existing user
@product_controller.route('/api/products/<int:product_code>', methods=['PUT'])
def update_product(product_code):
    print("actualizando producto")
    product = Products.query.get_or_404(product_code)
    data = request.json
    product.nombre = data['nombre']
    product.costo = data['costo']
    product.cantidad = data['cantidad']
    product.peso = data['peso']
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

# Delete an existing user
@product_controller.route('/api/products/<int:product_code>', methods=['DELETE'])
def delete_product(product_code):
    product = Products.query.get_or_404(product_code)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})
