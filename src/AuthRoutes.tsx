import { FC, useState } from "react";
import { Button, Text, StackLayout } from "@salt-ds/core";
import { Spinner, FormField, Input, Panel } from "@salt-ds/lab";
import { Form, useNavigate } from "react-router-dom";
import { Page, Center, Box } from "./Layouts";
import { useAuth } from "./Auth";

export const Login: FC = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <Page>
      <Center>
        <Box padding={2} style={{ maxWidth: "480px" }}>
          <Panel>
            <StackLayout gap={2}>
              <Text as="h1">Account login</Text>
              <Text>
                To access Orion, simply enter any email address and password.
                You can use test, rather than real, data for all fields in this
                app.
              </Text>

              <Form
                onSubmit={(e) => {
                  const formData = Object.fromEntries(
                    new FormData(e.target as HTMLFormElement)
                  );
                  if (!formData.email || !formData.password) {
                    return;
                  }
                  setLoading(true);
                  setUser({ email: formData.email as string });
                  setTimeout(() => {
                    setLoading(false);
                    navigate("/");
                  }, 1000);
                }}
              >
                <StackLayout gap={2}>
                  <FormField label="Email">
                    <Input
                      inputProps={{ name: "email", required: true }}
                      type="email"
                    />
                  </FormField>
                  <FormField label="Password">
                    <Input
                      inputProps={{ name: "password", required: true }}
                      type="password"
                    />
                  </FormField>
                  <Button
                    disabled={loading}
                    variant={loading ? undefined : "cta"}
                    type="submit"
                  >
                    {loading ? <Spinner /> : "Log In"}
                  </Button>
                </StackLayout>
              </Form>
            </StackLayout>
          </Panel>
        </Box>
      </Center>
    </Page>
  );
};
