## Laravel 8 With React.js and Giphy API

### Installation
```
git clone -b master https://github.com/psab72/laravel-react-giphy.git
```
**Go to project root folder**
```
cd laravel-react-giphy
```
*composer install**
```
composer install
```
**npm install**
```
npm install
```
**npm run watch or npm run dev**
```
npm run dev
```
or
```
npm run watch
```
**Copy .env file**
```
cp .env.example .env // Setup your local env file
```
**Generate APP_KEY**
```
php artisan key:generate
```
**Configure MySQL connection details in .env**

**Run database migrations and seeders**
```
php artisan migrate:fresh
```

```
php artisan serve
```

### Running the application if Mac user
For Mac users you can run the program with Laravel Valet. A local dev environment exclusive for Mac.
```
valet install
```
Make sure you are in the project root folder and run:
```
valet link
```
Go to the link:
```
laravel-react-giphy.test
```
