import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [keywords, setKeywords] = useState("");

  const getPosts = async (keywords) => {
    try {
      const results = await axios.get(
        `http://localhost:4001/trips?keywords=${keywords}`
      );
      console.log(results);
      setPosts(results.data.data);
    } catch (error) {
      console.log("request error!!");
    }
  };

  useEffect(() => {
    getPosts(keywords);
  }, [keywords]);

  const handlerTextInput = (event) => {
    setKeywords(event.target.value);
  };

  const handlerTagClick = (tag) => {
    setKeywords(tag);
    event.preventDefault();
  };

  return (
    <>
      <div className="topic">เที่ยวไหนดี</div>
      <p className="destination-search">ค้นหาที่เที่ยว</p>
      <input
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={keywords}
        onChange={handlerTextInput}
      />

      {posts.map((post) => (
        <div key={post.eid} className="destination-lists">
          <img className="main-image-post" src={post.photos[0]} />
          <div className="post-preview">
            <p className="post-title">{post.title}</p>
            <p className="post-description">
              {post.description.substring(0, 100)} ...
            </p>
            <a className="read-more-link" href={post.url} target="_blank">
              อ่านต่อ
            </a>

            <p className="post-tag">
              หมวด
              {post.tags.map((tag, index) => (
                <a
                  className="post-tag-by-index"
                  key={index}
                  href={`http://localhost:4001/trips?keywords=${tag}`}
                  onClick={() => handlerTagClick(tag)}
                >
                  {tag}
                </a>
              ))}
            </p>
            <div className="related-image">
              <img className="small-image1" src={post.photos[1]} />
              <img className="small-image2" src={post.photos[2]} />
              <img className="small-image3" src={post.photos[3]} />
              <button className="chain-icon">🔗</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Posts;
