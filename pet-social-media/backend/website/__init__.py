from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flasgger import Swagger  # Import Swagger
from flask_migrate import Migrate
from flask_cors import CORS
migrate = Migrate()

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    migrate.init_app(app, db)  

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/auth')

    from .models import User, create_admin

    with app.app_context():
        db.create_all()
        create_admin()


    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Initialize Swagger
    Swagger(app)

    return app
