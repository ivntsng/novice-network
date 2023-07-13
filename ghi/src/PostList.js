import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';


function PostList({ posts }){
    return (
        <>
        <h1>The #1 Tech Bootcamp Community</h1>
        <div className="container text-left">
            <Link to="/posts/create">
            <button type="button" className="btn btn-primary">
                Write a post
            </button>
            </Link>
        </div>

        <div className="container">
        <div className="row">
            {posts.map((post) => (
                <div className="col-sm-3">
                <div className="card" key={post.id} style={{width: '18rem', height: '12rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{post.owner_id}</h6>
                    <p className="card-text line-clamp-3">{post.description}</p>
                    <Link className="card-link" to={`/posts/${post.id}`} >read more</Link>
                </div>
                </div>
                </div>
            ))}
        </div>
        </div>
        </>
    );
}
export default PostList
