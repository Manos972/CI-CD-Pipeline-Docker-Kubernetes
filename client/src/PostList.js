import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost/posts");
            setPosts(res.data);
            setError(null); // Réinitialise l'état d'erreur en cas de succès
        } catch (error) {
            console.error('Erreur Axios lors de la récupération des posts:', error.message);
            setError('Une erreur s\'est produite lors de la récupération des posts.');
            setPosts({}); // Réinitialise les posts en cas d'erreur
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => {
        return (
            <div
                className="card"
                style={{width: "30%", marginBottom: "20px"}}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        );
    });

    const noPostsMessage = (
        <div className="alert alert-info">
            Aucun post n'est disponible pour le moment.
        </div>
    );

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            {Object.keys(posts).length === 0 ? noPostsMessage : renderedPosts}
        </div>
    );
};

export default PostList;
