export class DomUtils {
  static addClass($ele, className) {
    if (!$ele) {
      return;
    }

    className = className.split(' ');

    DomUtils.getElements($ele).forEach(($this) => {
      $this.classList.add(...className);
    });
  }

  static removeClass($ele, className) {
    if (!$ele) {
      return;
    }

    className = className.split(' ');

    DomUtils.getElements($ele).forEach(($this) => {
      $this.classList.remove(...className);
    });
  }

  static hasEllipsis($ele) {
    if (!$ele) {
      return false;
    }

    return $ele.scrollWidth > $ele.offsetWidth;
  }

  static getElements($ele) {
    if (!$ele) {
      return;
    }

    if ($ele.forEach === undefined) {
      $ele = [$ele];
    }

    return $ele;
  }

  static getMoreVisibleSides($ele) {
    if (!$ele) {
      return {};
    }

    let box = $ele.getBoundingClientRect();
    let availableWidth = window.innerWidth;
    let availableHeight = window.innerHeight;
    let leftArea = box.left;
    let topArea = box.top;
    let rightArea = availableWidth - leftArea - box.width;
    let bottomArea = availableHeight - topArea - box.height;
    let horizontal = leftArea > rightArea ? 'left' : 'right';
    let vertical = topArea > bottomArea ? 'top' : 'bottom';

    return {
      horizontal,
      vertical,
    };
  }

  static getAbsoluteCoords($ele) {
    if (!$ele) {
      return;
    }

    let box = $ele.getBoundingClientRect();
    let pageX = window.pageXOffset;
    let pageY = window.pageYOffset;

    return {
      width: box.width,
      height: box.height,
      top: box.top + pageY,
      right: box.right + pageX,
      bottom: box.bottom + pageY,
      left: box.left + pageX,
    };
  }

  static getCoords($ele) {
    return $ele ? $ele.getBoundingClientRect() : {};
  }

  static getData($ele, name, type) {
    if (!$ele) {
      return;
    }

    let value = $ele ? $ele.dataset[name] : '';

    if (type === 'number') {
      value = parseFloat(value) || 0;
    } else {
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
    }

    return value;
  }

  static setData($ele, name, value) {
    if (!$ele) {
      return;
    }

    $ele.dataset[name] = value;
  }

  static setStyle($ele, name, value) {
    if (!$ele) {
      return;
    }

    $ele.style[name] = value;
  }

  static show($ele, value = 'block') {
    DomUtils.setStyle($ele, 'display', value);
  }

  static hide($ele) {
    DomUtils.setStyle($ele, 'display', 'none');
  }

  static getHideableParentOffset($ele) {
    let $hideableParent = DomUtils.getHideableParent($ele);
    let x = window.scrollX;
    let y = window.scrollY;

    if ($hideableParent) {
      let coords = DomUtils.getAbsoluteCoords($hideableParent);
      x += coords.left;
      y += coords.top;
    }

    return { x, y };
  }

  /** getting parent element which could hide absolute positioned child */
  static getHideableParent($ele) {
    let $hideableParent;
    let $parent = $ele.parentElement;

    while ($parent) {
      let overflowValue = getComputedStyle($parent).overflow;

      if (overflowValue.indexOf('scroll') !== -1 || overflowValue.indexOf('auto') !== -1) {
        $hideableParent = $parent;
        break;
      }

      $parent = $parent.parentElement;
    }

    return $hideableParent;
  }
}
