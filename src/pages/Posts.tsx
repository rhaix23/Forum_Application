import { Flex, Image, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PreviewPostCard, PostsOptions } from "../components";
import { getSubcategoryPosts } from "../features/post/postThunks";
import { AppDispatch, RootState } from "../store";
import nopostsImage from "../assets/noposts.png";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { posts, status } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(getSubcategoryPosts({ id }));
    }
  }, []);

  const renderPosts =
    posts &&
    posts.map((post) =>
      posts ? <PreviewPostCard key={post._id} post={post} /> : null
    );

  return (
    <>
      <PostsOptions />
      {posts.length === 0 && status !== "pending" ? (
        <Flex direction="column" justify="center" align="center">
          <div style={{ width: 400, marginLeft: "auto", marginRight: "auto" }}>
            <Image src={nopostsImage} radius="md" />
          </div>
          <Text size={20}>
            There are no posts in this subcategory. Be the first to create one!
          </Text>
        </Flex>
      ) : (
        <Stack mb={64}>{renderPosts}</Stack>
      )}
    </>
  );
};

export { Posts };
