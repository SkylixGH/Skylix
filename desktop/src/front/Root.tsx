import { App, Button, Flex, Input, TextBlock } from "@skylixgh/luxjs-client";
import React from "react";

const Root = React.forwardRef(() => {
    return (
        <>
            <App title="Skylix"> 
                <Flex padding="20px 20px 10px 20px">
                    <TextBlock header={3}>Login</TextBlock>
                </Flex>

                <Flex direction="column" gap="10px" padding="20px">
                    <TextBlock>Email or User Name</TextBlock>
                    <Input placeHolder="Email or User Name" />
                    <br />

                    <TextBlock>Password</TextBlock>
                    <Input placeHolder="Password" />

                    <Flex padding="0">{}</Flex>
                    <Button>Login</Button>
                </Flex>
            </App>
        </>
    );
});

export default Root;
