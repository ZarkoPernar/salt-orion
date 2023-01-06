import { useState, PropsWithChildren } from "react";
import {
  Button,
  FlowLayout,
  GridLayout,
  StackLayout,
  SaltProvider,
  Text,
  FlexLayout,
} from "@salt-ds/core";
import { SplitLayout } from "@salt-ds/lab";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { Box, Page } from "./Layouts";
import { Dialog, TabPanel, Tabs } from "@salt-ds/lab";
import { CloseIcon, WarningIcon } from "@salt-ds/icons";
import { PaymentFlow } from "./PaymentFlow";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AppLogo } from "./AppLogo";
import { SmallTable } from "./SmallTable";

const Header = ({ children }: PropsWithChildren) => {
  return <div className="appHeader">{children}</div>;
};

export const InAppRoutes = () => {
  const { user, setUser } = useAuth();
  const [payDialogOpen, setPayDialogOpen] = useState(false);
  if (!user) {
    return <Navigate to="login" />;
  }

  return (
    <Page>
      <Dialog open={payDialogOpen} title="Pay your bill">
        <StackLayout align="center" gap={2}>
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <Button
              onClick={() => {
                setPayDialogOpen(false);
              }}
              variant="secondary"
            >
              <CloseIcon />
            </Button>
          </div>
          <Text>Pay your bill</Text>
          <PaymentFlow
            onComplete={() => {
              setPayDialogOpen(false);
            }}
          />
        </StackLayout>
      </Dialog>
      <Header>
        <Box padding={2}>
          <SplitLayout
            leftSplitItem={
              <FlexLayout align="center" className="logo">
                <AppLogo />
                Orion
              </FlexLayout>
            }
            rightSplitItem={<ThemeSwitcher />}
          />
        </Box>
      </Header>
      <Box padding={10}>
        <StackLayout gap={4}>
          <GridLayout columns={2}>
            <StackLayout gap={4} separators>
              <StackLayout gap={4}>
                <SplitLayout
                  wrap={false}
                  leftSplitItem={
                    <StackLayout gap={4}>
                      <div>Welcome, Wen Chou</div>
                      <Text styleAs="h2">Current bill</Text>
                      <StackLayout gap={1}>
                        <Text styleAs="h4">Amount (USD):</Text>

                        <FlowLayout gap={2}>
                          <Text style={{ fontSize: 50 }} styleAs="h1">
                            $3,440.75
                          </Text>
                          <StackLayout gap={0}>
                            <Text style={{ fontSize: 12 }}>Due date:</Text>
                            <Text>Oct 1, 2022</Text>
                          </StackLayout>
                        </FlowLayout>

                        <FlowLayout gap={1} align="center">
                          <WarningIcon />
                          <Text styleAs="h4">Due in 3 days</Text>
                        </FlowLayout>
                      </StackLayout>
                    </StackLayout>
                  }
                  rightSplitItem={
                    <div>Last logged in Sep 27, 2022 at 3:44 pm</div>
                  }
                />

                <SplitLayout
                  leftSplitItem={<span />}
                  rightSplitItem={
                    <Button
                      variant="cta"
                      onClick={() => {
                        setPayDialogOpen(true);
                      }}
                    >
                      Pay Bill
                    </Button>
                  }
                />
              </StackLayout>

              <Text styleAs="h3">Total spent last month:</Text>
            </StackLayout>
            <div
              style={{
                borderLeft: "1px solid lightgray",
              }}
            >
              <Box paddingX={4}>
                <Tabs>
                  <TabPanel label="Recent Activity">
                    <SaltProvider density="medium">
                      <SmallTable />
                    </SaltProvider>
                  </TabPanel>
                  <TabPanel label="Messages"></TabPanel>
                  <TabPanel label="Contacts"></TabPanel>
                </Tabs>
              </Box>
            </div>
          </GridLayout>

          <div>
            <Button
              onClick={() => {
                setUser(null);
              }}
            >
              Logout
            </Button>
          </div>
        </StackLayout>
      </Box>
    </Page>
  );
};
