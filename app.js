import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { HttpError } from "http-errors";
import logger from "./config/logger.js";
import googleAuthRoutes from "./routes/GoogleAuth.js";
import githubAuthRoutes from "./routes/GithubAuth.js";
import initializePassport from "./passport.js";

dotenv.config();
const app = express();
initializePassport();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cookieSession({ name: "session", keys: ["sid"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(function (request, response, next) {
	if (request.session && !request.session.regenerate) {
		request.session.regenerate = (cb) => {
			cb();
		};
	}
	if (request.session && !request.session.save) {
		request.session.save = (cb) => {
			cb();
		};
	}
	next();
});
app.use(passport.initialize());
app.use(passport.session());

export default app;

app.get("/", (req, res) => {
	res.send(`Server is Running`);
});
app.use("/api/v1/auth", googleAuthRoutes);
app.use("/api/v1/auth", githubAuthRoutes);
app.use((err, req, res, next) => {
	logger.error(err.message);
	const statusCode = err.statusCode || err.status || 500;
	res.status(statusCode).json({
		errors: [
			{
				type: err.name,
				msg: err.message,
				path: "",
				location: "",
			},
		],
	});
});
