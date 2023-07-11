import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';


function PostList({ posts }){
    return (
        <>
        <h1>The #1 Tech Bootcamp Community</h1>
        <div>
            <button type="button" className="btn btn-primary">
                Write a post
            </button>
        </div>
        <div className="row">
            {posts.map((post) => (
            <div className="card" key={post.id} style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{post.owner_id}</h6>
                <p className="card-text line-clamp-3">{post.description}</p>
                <a href="#" className="card-link">Read more</a>
            </div>
            </div>
            ))}
        </div>
        </>
    );
}
export default PostList
