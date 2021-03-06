import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';
import Footer from '../components/footer';
import Blogs from '../components/blog/blogs';
import Menu from '../components/blog/menu';
import LinearProgress from '@material-ui/core/LinearProgress';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Entry from '../components/entry';
import FeaturedPost from '../components/blog/featured';

const api_url = process.env.API_URL;

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
      lastLength: 10,
      limit: 10
    };
  }

  static async getInitialProps(ctx) {
    const { authorization } = parseCookies(ctx);
    const res = await fetch(`${api_url}/post?skip=0&limit=10`);
    const data = await res.json();
    const res_featured = await fetch(`${api_url}/post/latest`);
    const data_featured = await res_featured.json();
    let user;
    if (authorization) {
      const res = await fetch(`${api_url}/user`, { headers: { authorization } });
      user = await res.json();
    }
    return {
      featuredPost: data_featured,
      user,
      authorization,
      posts: data
    };
  }

  infiniteScroll = async (inView, _) => {
    const { lastLength, limit } = this.state;
    if (inView && lastLength !== 0) {
      this.setState({ fetching: true });
      const res = await fetch(`${api_url}/post?skip=${this.state.posts.length}&limit=${limit}`);
      const data = await res.json();
      this.setState({ posts: this.state.posts.concat(data), lastLength: data.length });
      this.setState({ fetching: false });
    }

  }


  render() {
    const { featuredPost, authorization } = this.props;
    const { posts } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Zemuldo Blog - I write and Share my Experience.</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zemuldo" />
          <meta name="twitter:creator" content="@zemuldo" />
          <meta name="twitter:title" content="Zemuldo Blog" />
          <meta name="twitter:description" content="Danstan Onyango ~ zemuldo. Software Engineer, Nairobi, Kenya. Passion mixed with enthusiasm and bundled together with Geekiness, served on port Awesomeness." />
          <meta name="twitter:image" content="https://zemuldo.com/images/site/site-blog.png" />

          <meta property='og:title' content="Zemuldo Blog" />
          <meta property="og:image" content="https://zemuldo.com/images/site/site-blog.png" />
          <meta property='og:url' content='https://zemuldo.com/blog' />

          <meta name="keywords" content="zemuldo, blog, danstan, danstan onyango, danstan otieno onyango, developer, engineer, software developer, software engineer, software developer nairobi, software engineer nairobi, linux, nodejs, software, zemuldo.com, programming, coder, nodejs, elixir, software engineer in nairobi, software developer in nairobi, top software engineers in kenya, elixir software engineer developer, nodejs engineer developer" />
        
          <meta name="description" content="Blog by Danstan Onyango, Software Engineer, Nairobi, Kenya. Tech articles, Tutorials and Reviews. Sharing content that inspires." />
        </Head>
        <Container style={{ color: 'white' }} maxWidth="md">

          <Grid container justify="center" alignItems="center">
            <Menu authorization={authorization} />
          </Grid>
        </Container>
        <Container style={{ color: 'white' }} maxWidth="md">
          <FeaturedPost featuredPost={featuredPost}/>
          <Blogs _infiniteScroll={this.infiniteScroll} posts={posts} />
          <br />
          {this.state.fetching && <div style={{ flexGrow: 1, color: 'white' }}><LinearProgress /> </div>}
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  authorization: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  user: PropTypes.object,
  featuredPost: PropTypes.object.isRequired,
};

export default Entry(Blog);