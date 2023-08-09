import express from "express";
import _ from "lodash";
import mongoose from "mongoose";

const app = express();
const port = 3000;

await mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true })

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


const homeStartingContent = "Bacon ipsum dolor amet meatball flank hamburger shank, bresaola filet mignon turkey sausage jerky burgdoggen porchetta doner. Boudin bacon burgdoggen corned beef. Shankle pastrami bacon buffalo landjaeger bresaola beef ribs kielbasa ham hock pig venison drumstick biltong. Pastrami tri-tip salami, cow meatloaf ground round chislic beef tail andouille burgdoggen porchetta brisket. Porchetta drumstick pork belly ribeye meatball buffalo. Prosciutto t-bone tail rump beef fatback, spare ribs tri-tip buffalo andouille."
const aboutContent = "Prosciutto t-bone strip steak pig, doner tri-tip frankfurter ball tip jerky. Jerky filet mignon beef sirloin bacon short ribs pork chop ground round flank shoulder drumstick kevin. Leberkas spare ribs boudin swine brisket beef ribs. Rump chislic tenderloin swine buffalo, pancetta drumstick ham hock sausage shankle t-bone. Picanha prosciutto pig burgdoggen chicken doner. Bresaola chislic short ribs, chicken pig jowl strip steak porchetta burgdoggen venison picanha."
const contactContent = "Pork belly t-bone pastrami, venison biltong ball tip spare ribs chuck kevin porchetta. Capicola cow tenderloin tail alcatra doner burgdoggen sirloin ribeye. Tri-tip porchetta pig, kielbasa filet mignon doner chislic pork loin drumstick tenderloin ball tip shoulder. Swine ham hock fatback jowl boudin, sausage pork belly burgdoggen corned beef capicola. Kevin sausage pastrami fatback corned beef pork belly rump tri-tip picanha chislic beef ribs ham hock shankle. Ham hock shoulder salami venison, pork chop biltong picanha jerky corned beef leberkas andouille. Bresaola andouille turducken buffalo sirloin swine, picanha landjaeger leberkas meatloaf."


const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema)


app.get("/", async (req, res) => {

  const foundComposed = await Post.find({});

  res.render("home.ejs", { 
    startingContent: homeStartingContent, 
    posts: foundComposed
  });
});


app.get("/about", (req, res) => {
  res.render("about.ejs", { startingContent: aboutContent });
});


app.get("/contact", (req, res) => {
  res.render("contact.ejs", { startingContent: contactContent });
});


app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});


app.post("/compose", (req, res) => {
  Post.create({
    title: req.body.postTitle,
    content: req.body.post
  });
  res.redirect("/");
});


app.get("/posts/:postId", async (req, res) => {
  const requestedPostId = req.params.postId;

  const idStorage = await Post.findOne({ _id: requestedPostId });

  res.render("post.ejs", { 
    title: idStorage.title,
    content: idStorage.content
  });
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});