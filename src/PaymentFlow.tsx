import React, { PropsWithChildren, useState } from "react";
import {
  Button,
  FlexLayout,
  FlowLayout,
  GridLayout,
  StackLayout,
  Text,
} from "@salt-ds/core";
import {
  Card,
  Checkbox,
  FormField,
  Input,
  ParentChildLayout,
  RadioButtonBase,
  SplitLayout,
} from "@salt-ds/lab";
import { paymentCards } from "./paymentCards";
import { Box } from "./Layouts";
import "./components.css";

const SelectableCard = ({ children }: PropsWithChildren<{}>) => {
  return (
    <label className="selectableCard">
      <Card interactable>{children}</Card>
    </label>
  );
};

const Form = ({
  onSubmit,
  children,
}: PropsWithChildren<{ onSubmit(): void }>) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return <form onSubmit={handleSubmit}>{children}</form>;
};

const FirstStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [selected, setSelected] = useState<number>(1);
  return (
    <StackLayout gap={2}>
      <Text styleAs="h1">Select payment method</Text>
      <Form onSubmit={onNext}>
        <StackLayout gap={10}>
          <GridLayout rows={2} columns={2}>
            {paymentCards.map((card, index) => {
              return (
                <SelectableCard key={index}>
                  <StackLayout separators>
                    <StackLayout align="center">
                      <img
                        src={card.image.src}
                        alt={card.image.alt}
                        width={60}
                        height={46}
                      />
                    </StackLayout>
                    <FlexLayout gap={1} align="start">
                      <RadioButtonBase
                        onChange={() => {
                          setSelected(index);
                        }}
                        checked={index === selected}
                      />
                      <StackLayout gap={0.5}>
                        <Text styleAs="h4">
                          {card.cardName || "Add new card"}
                        </Text>
                        {card.cardName ? (
                          <Text styleAs="h4">
                            •••• •••• ••••{" "}
                            {card.cardNumber.slice(card.cardNumber.length - 4)}
                          </Text>
                        ) : null}
                      </StackLayout>
                    </FlexLayout>
                  </StackLayout>
                </SelectableCard>
              );
            })}
          </GridLayout>
          <FlexLayout justify="end" gap={1}>
            <Button type="button" style={{ minWidth: 130 }} onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit" style={{ minWidth: 130 }} variant="cta">
              Next
            </Button>
          </FlexLayout>
        </StackLayout>
      </Form>
    </StackLayout>
  );
};

const SecondStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <StackLayout gap={2}>
      <Text styleAs="h1">Enter card details</Text>
      <Form onSubmit={onNext}>
        <StackLayout gap={10}>
          <Box style={{ maxWidth: 420 }}>
            <StackLayout gap={2}>
              <FormField label="Card Number">
                <Input
                  inputProps={{
                    name: "card",
                    placeholder: "XXXX - XXXX - XXXX - XXXX",
                  }}
                />
              </FormField>
              <FormField label="Card Holder's Name">
                <Input inputProps={{ name: "name" }} />
              </FormField>

              <GridLayout columns={3}>
                <FormField label="Expiry Date">
                  <Input
                    inputProps={{
                      name: "expiry",
                      placeholder: "MM/YY",
                    }}
                  />
                </FormField>
                <FormField label="CVV">
                  <Input
                    inputProps={{
                      name: "cvv",
                      placeholder: "XXX",
                    }}
                  />
                </FormField>
                <FormField label="ZIP Code">
                  <Input inputProps={{ name: "zip" }} />
                </FormField>
              </GridLayout>

              <Checkbox label="Save for future payments" />
            </StackLayout>
          </Box>
          <FlexLayout justify="end" gap={1}>
            <Button type="button" style={{ minWidth: 130 }} onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit" style={{ minWidth: 130 }} variant="cta">
              Next
            </Button>
          </FlexLayout>
        </StackLayout>
      </Form>
    </StackLayout>
  );
};

const ThirdStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [selected, setSelected] = useState<number>(1);
  const options = [
    { title: "Pay now", desc: "Your payment will be processed immediately." },
    {
      title: "Pay on due date",
      desc: "Your payment will be made on Jan 8, 2023.",
    },
    { title: "Pay on another day", desc: "" },
  ];
  return (
    <StackLayout gap={2}>
      <Text styleAs="h1">Choose payment date</Text>
      <Form onSubmit={onNext}>
        <StackLayout gap={10}>
          <SplitLayout
            leftSplitItem={
              <StackLayout gap={2}>
                {options.map((option, index) => {
                  return (
                    <SelectableCard>
                      <FlexLayout gap={1} align="start">
                        <RadioButtonBase
                          onChange={() => {
                            setSelected(index);
                          }}
                          checked={index === selected}
                        />
                        <StackLayout gap={0.5}>
                          <Text styleAs="h4">{option.title}</Text>

                          <Text>{option.desc}</Text>
                        </StackLayout>
                      </FlexLayout>
                    </SelectableCard>
                  );
                })}
              </StackLayout>
            }
            rightSplitItem={<span />}
          />
          <FlexLayout justify="end" gap={1}>
            <Button type="button" style={{ minWidth: 130 }} onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit" style={{ minWidth: 130 }} variant="cta">
              Next
            </Button>
          </FlexLayout>
        </StackLayout>
      </Form>
    </StackLayout>
  );
};

const FourthStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <StackLayout gap={2}>
      <Text styleAs="h1">Review summary</Text>
      <Form onSubmit={onNext}>
        <StackLayout gap={10}>
          <SplitLayout
            leftSplitItem={
              <StackLayout gap={2}>
                <StackLayout gap={1}>
                  <Text styleAs="h3">Total amount (USD):</Text>
                  <Text styleAs="h1" style={{ fontSize: 50 }}>
                    $3,122.79
                  </Text>
                </StackLayout>
                <FormField label="Due on">
                  <Input readOnly value="Jan 8, 2023" />
                </FormField>
                <FormField label="Payment date">
                  <Input readOnly value="Jan 8, 2023" />
                </FormField>
                <FormField label="Processing fee">
                  <Input readOnly value="No fee" />
                </FormField>
              </StackLayout>
            }
            rightSplitItem={
              <Card>
                <SplitLayout
                  leftSplitItem={
                    <StackLayout gap={0.5}>
                      <Text styleAs="label">Payment method:</Text>
                      <Text styleAs="h4">{paymentCards[1].name}</Text>
                      <Text styleAs="h4">
                        •••• •••• ••••{" "}
                        {paymentCards[1].cardNumber.slice(
                          paymentCards[1].cardNumber.length - 4
                        )}
                      </Text>
                      <Text styleAs="h4">
                        Expiry date: {paymentCards[1].expDate}
                      </Text>
                    </StackLayout>
                  }
                  rightSplitItem={
                    <img
                      src={paymentCards[1].image.src}
                      alt={paymentCards[1].image.alt}
                      width={60}
                      height={46}
                    />
                  }
                />
              </Card>
            }
          />

          <FlexLayout justify="end" gap={1}>
            <Button type="button" style={{ minWidth: 130 }} onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit" style={{ minWidth: 130 }} variant="cta">
              Next
            </Button>
          </FlexLayout>
        </StackLayout>
      </Form>
    </StackLayout>
  );
};

const FifthStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <StackLayout gap={2}>
      <Text styleAs="h1">Authorize payment</Text>
      <Form onSubmit={onNext}>
        <StackLayout gap={10}>
          <StackLayout gap={4}>
            <Box style={{ maxWidth: 620 }}>
              <Text>
                This is where permission is requested for the payment card to be
                debited—using wording and agreement terms that have been
                approved by regional legal and compliance teams.
              </Text>
            </Box>
            <Checkbox label="I accept the payment terms" />
          </StackLayout>

          <FlexLayout justify="end" gap={1}>
            <Button type="button" style={{ minWidth: 130 }} onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit" style={{ minWidth: 130 }} variant="cta">
              Next
            </Button>
          </FlexLayout>
        </StackLayout>
      </Form>
    </StackLayout>
  );
};

export const PaymentFlow = ({ onComplete }: { onComplete(): void }) => {
  const [step, setStep] = useState<number>(0);
  const onNext = () => {
    if (step === 4) {
      return onComplete();
    }
    setStep(step + 1);
  };
  const onPrev = () => {
    if (step === 0) {
      return;
    }
    setStep(step - 1);
  };
  const steps = [
    {
      title: "Select payment method",
      body: <FirstStep onNext={onNext} onPrev={onPrev} />,
    },
    {
      title: "Enter card details",
      body: <SecondStep onNext={onNext} onPrev={onPrev} />,
    },
    {
      title: "Choose payment date",
      body: <ThirdStep onNext={onNext} onPrev={onPrev} />,
    },
    {
      title: "Review summary",
      body: <FourthStep onNext={onNext} onPrev={onPrev} />,
    },
    {
      title: "Authorize payment",
      body: <FifthStep onNext={onNext} onPrev={onPrev} />,
    },
  ];

  return (
    <div>
      <ParentChildLayout
        parent={
          <StackLayout gap={0}>
            {steps.map((config, index) => {
              return (
                <>
                  <NavItem completed={step > index} active={step === index}>
                    {config.title}
                  </NavItem>
                  {index === steps.length - 1 ? null : (
                    <Connector
                      completed={step > index}
                      active={step === index}
                    />
                  )}
                </>
              );
            })}
          </StackLayout>
        }
        child={
          <Box paddingX={2} style={{ minWidth: 620 }}>
            {steps[step].body}
          </Box>
        }
      />
    </div>
  );
};

const NavItem = ({
  children,
  completed,
  active,
}: PropsWithChildren<{ completed?: boolean; active?: boolean }>) => {
  return (
    <FlowLayout align="center" gap={1}>
      <div
        style={{
          borderRadius: 9999,
          width: 12,
          height: 12,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor:
            active || completed
              ? "var(--salt-selectable-borderColor-selected)"
              : "var(--salt-selectable-borderColor)",
          backgroundColor: completed
            ? "var(--salt-selectable-borderColor-selected)"
            : "var(--salt-selectable-background)",
        }}
      />
      <Text>{children}</Text>
    </FlowLayout>
  );
};

function Connector({
  completed,
  active,
}: {
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div
      style={{
        borderStyle: completed ? "solid" : "dotted",
        borderWidth: "0 0 0 2px",
        borderColor:
          completed || active
            ? "var(--salt-selectable-borderColor-selected)"
            : "var(--salt-selectable-borderColor)",
        marginBlock: completed ? -4 : 10,
        height: completed ? 46 : 18,
        marginLeft: 5,
      }}
    ></div>
  );
}
