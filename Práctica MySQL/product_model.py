from users.models.db import db

class Products(db.Model):
    code = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    costo = db.Column(db.String(100), unique=True, nullable=False)
    cantidad = db.Column(db.String(100), unique=True, nullable=False)
    peso = db.Column(db.String(100), nullable=False)

    def __init__(self, nombre, costo, cantidad, peso):
        self.nombre = nombre
        self.costo = costo
        self.cantidad = cantidad
        self.peso = peso
