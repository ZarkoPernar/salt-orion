import React, { FC, ReactNode } from "react";

export const Box: FC<{
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({ children, padding, paddingX, paddingY, style, ...props }) => {
  const paddings: React.CSSProperties = {};
  if (typeof padding === "number") {
    paddings.padding = `calc(var(--salt-size-basis-unit) * ${padding})`;
  }
  if (typeof paddingX === "number") {
    const horizontalPadding = `calc(var(--salt-size-basis-unit) * ${paddingX})`;
    paddings.paddingLeft = horizontalPadding;
    paddings.paddingRight = horizontalPadding;
  }

  if (typeof paddingY === "number") {
    const verticalPadding = `calc(var(--salt-size-basis-unit) * ${paddingY})`;
    paddings.paddingTop = verticalPadding;
    paddings.paddingBottom = verticalPadding;
  }

  return (
    <div
      style={{
        ...paddings,
        minWidth: 0,
        minHeight: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const View: FC<{ padding: number; children: ReactNode }> = ({
  children,
  padding,
}) => {
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>{children}</Box>
  );
};

export const Center: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {children}
    </div>
  );
};

export const Page: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
