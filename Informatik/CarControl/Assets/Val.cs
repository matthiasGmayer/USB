using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class Val : MonoBehaviour, IEndDragHandler
{
    private Slider me;

    void Awake()
    {
        me = gameObject.GetComponent<Slider>();
    }


    public void OnEndDrag(PointerEventData data)
    {
        me.value = 0f;
    }
}

