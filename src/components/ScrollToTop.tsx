import { IconArrowUp } from "@tabler/icons";
import { useWindowScroll } from "@mantine/hooks";
import { ActionIcon, Affix, Transition } from "@mantine/core";

const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            variant="filled"
            color="blue"
          >
            <IconArrowUp size={16} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};

export { ScrollToTop };
